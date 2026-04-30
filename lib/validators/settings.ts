import { z } from "zod";

export const settingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().max(2000),
});

export const settingsBatchSchema = z.array(settingSchema);

export type SettingInput = z.infer<typeof settingSchema>;
