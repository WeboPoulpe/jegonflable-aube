import { z } from "zod";

export const gameTypeEnum = z.enum([
  "CHATEAU",
  "PARCOURS",
  "TOBOGGAN",
  "COMBO",
  "SPORT",
  "AUTRE",
]);

export const gameSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(100),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres et tirets)"),
  type: gameTypeEnum,
  description: z.string().min(10, "Description trop courte").max(2000),
  pricePerDay: z.coerce.number().min(0, "Prix invalide"),
  capacity: z.coerce.number().int().min(1).max(50),
  ageMin: z.coerce.number().int().min(0).max(99),
  ageMax: z.coerce.number().int().min(0).max(99),
  width: z.coerce.number().min(0),
  length: z.coerce.number().min(0),
  height: z.coerce.number().min(0),
  weight: z.coerce.number().min(0).optional().nullable(),
  photoUrl: z.string().url("URL invalide"),
  galleryUrls: z.array(z.string().url()).default([]),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export type GameInput = z.infer<typeof gameSchema>;
