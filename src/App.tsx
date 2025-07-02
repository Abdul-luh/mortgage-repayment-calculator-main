import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Calculator } from "lucide-react";
import type { MortgageFormData } from "./lib/schema";
import { mortgageSchema } from "./lib/schema";
import { useState } from "react";
import { monthlyRepaymentCalc, yearlyRepaymentCalc } from "./lib/calculate";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    mode: "onTouched",
  });
  const [monthly, setMonthly] = useState("");
  const [total, setTotal] = useState("");

  function handleSubmitForm(data: MortgageFormData) {
    const { amount, term, rate } = data;
    setMonthly(monthlyRepaymentCalc(amount, term, rate));
    setTotal(yearlyRepaymentCalc(amount, term, rate));
  }

  return (
    <main className="flex justify-center items-center bg-slate-100 w-full min-h-screen">
      <div className="grid grid-cols-2 md:flex-row bg-white max-w-3xl w-full rounded-2xl">
        {/* left on desktop  */}
        <div className="flex flex-col gap-4 p-4">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h1 className="text-xl font-plusjakarta-bold font-bold text-slate-900">
                Mortgage Calculator
              </h1>
              <button
                type="button"
                onClick={() => reset()}
                className="text-sm hover:underline text-slate-700 "
              >
                Clear All
              </button>
            </div>

            {/* Mortgage Amount */}
            <div>
              <Label htmlFor="amount" className="block mb-1 text-slate-700">
                Mortgage Amount
              </Label>
              <div className="relative">
                <span
                  className={`absolute left-[1.2px] top-1/2 -translate-y-1/2 px-3 py-1 font-bold rounded-l-md h-[34px] ${
                    errors.amount
                      ? " bg-Red text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  £
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="any"
                  {...register("amount", { valueAsNumber: true })}
                  className={`pl-10 ${errors.amount && "border-Red"}`}
                />
              </div>
              {errors.amount && (
                <span className="text-Red text-xs">
                  {errors.amount.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Term */}
              <div>
                <Label htmlFor="term" className="block mb-1  text-slate-700">
                  Mortgage Term
                </Label>
                <div className="relative">
                  <Input
                    id="term"
                    type="number"
                    {...register("term", { valueAsNumber: true })}
                    className={`pr-12 ${errors.term && "border-Red"}`}
                  />
                  <span
                    className={`absolute right-[1px] top-1/2 -translate-y-1/2  px-2 py-1 font-bold text-sm rounded-r-md h-[34px] ${
                      errors.term
                        ? " bg-Red text-white"
                        : " bg-slate-100 text-slate-500"
                    }`}
                  >
                    years
                  </span>
                </div>
                {errors.term && (
                  <span className="text-red-500 text-xs">
                    {errors.term.message as string}
                  </span>
                )}
              </div>

              {/* Interest Rate */}
              <div>
                <Label htmlFor="rate" className="block mb-1 text-slate-700">
                  Interest Rate
                </Label>
                <div className="relative p-0">
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    {...register("rate", { valueAsNumber: true })}
                    className={`pr-10 ${errors.rate && "border-Red"}`}
                  />
                  <span
                    className={`absolute right-[1px] top-1/2 -translate-y-1/2  py-1 px-2 font-bold text-sm rounded-r-md h-[34px] ${
                      errors.rate
                        ? " bg-Red text-white"
                        : " bg-slate-100 text-slate-500"
                    }`}
                  >
                    %
                  </span>
                </div>
                {errors.rate && (
                  <span className="text-red-500 text-xs">
                    {errors.rate.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* Mortgage Type */}
            <div>
              <Label className="block mb-2 text-slate-700">Mortgage Type</Label>
              <RadioGroup defaultValue="repayment" {...register("type")}>
                <Label
                  htmlFor="repayment"
                  className="text-sm border p-3 selection:bg-Lime/20 text-slate-900 font-medium rounded mb-2"
                >
                  <RadioGroupItem value="repayment" id="repayment" />
                  Repayment
                </Label>

                <Label
                  htmlFor="interest-only"
                  className="text-sm border p-3 text-slate-900 font-medium rounded mb-4"
                >
                  <RadioGroupItem value="interest-only" id="interest-only" />
                  Interest Only
                </Label>
              </RadioGroup>
              {errors.type && (
                <span className="text-red-500 text-xs">
                  {errors.type.message as string}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="hover:bg-Lime bg-Lime cursor md:w-2/3 text-slate-900 rounded-full text-base py-6"
            >
              <Calculator className="mr-2" size={20} />
              Calculate Repayments
            </Button>
          </form>
        </div>

        {/* right side on desktop  */}
        <div className="bg-slate-900 flex flex-col justify-center w-full md:rounded-r-2xl md:rounded-bl-4xl p-5">
          {!(monthly && total) ? (
            <div className="flex flex-col justify-center items-center">
              <img
                src="/assets/images/illustration-empty.svg"
                alt="icon-calculator"
                className="object-fit place-items-center"
              />
              <h2 className="font-plusjakarta-bold text-white text-center">
                Result shown here
              </h2>
              <p className="font-plusjakarta-medium text-slate-300 text-sm text-center mt-2">
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be
              </p>
            </div>
          ) : (
            <div>
              <h2 className="font-plusjakarta-bold text-white pb-4 text-3xl font-bold">
                your results
              </h2>{" "}
              <p className="text-slate-300 pb-4">
                Your results are shown below based on the information provided.
                to adjust the results, edit the forma and click "calculate
                repayments" again
              </p>
              <div className="rounded-xl border-t-8 border-t-Lime p-4 bg-slate-900">
                <p className="text-slate-100/80">Your monthly repayment</p>
                <h2 className="text-Lime">${monthly}</h2>
                <hr className="border-slate-300 my-4" />
                <p className="text-slate-100/80">
                  Total you'll repay over the term
                </p>
                <h3 className="text-white">${monthly}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
