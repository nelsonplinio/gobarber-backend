import { subHours, isBefore } from 'date-fns';

import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

import CancellationMail from '../jobs/CancellationMail';

import User from '../models/User';
import Appointment from '../models/Appointment';

class CancelAppointmentService {
  async run({ user_id, appointment_id }) {
    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!appointment) {
      throw new Error('This appointment not found');
    }

    if (appointment.user_id !== user_id) {
      throw new Error("You don't have permissionto cancel this appointment.");
    }

    /**
     * Check if user can cancel this appointment.
     * rule is, user can cancel only before 2hours
     */
    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance.');
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
