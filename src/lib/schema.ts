import { z } from "zod";

export const mortgageSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(1, "Amount must be greater than 0"),
  term: z
    .number({ invalid_type_error: "Term is required" })
    .min(1, "Term must be at least 1 year"),
  rate: z
    .number({ invalid_type_error: "Rate is required" })
    .min(0, "Rate must be 0 or greater"),
  type: z.enum(["repayment", "interest-only"], {
    required_error: "Mortgage type is required",
  }),
});

export type MortgageFormData = z.infer<typeof mortgageSchema>;
