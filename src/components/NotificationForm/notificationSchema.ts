import { z } from 'zod';

const notificationSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(5).max(50),
  //   is_deleted: z.boolean().default(false),
  //   eventId: z.string(), // Assuming eventId is a string
  templatesubject: z.string().min(10).max(50),
  templatebody: z.string().min(10).max(250),
  //   tags: z.array(
  //     z.object({
  //       label: z.string().min(1).max(50),
  //     })
  //   ),
  //   is_active: z.boolean().default(false),
});

export default notificationSchema;
