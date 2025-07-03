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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./components/ui/form";

function App() {
  const form = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    mode: "onTouched",
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
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
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="space-y-5"
            >
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
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="amount"
                      className="block mb-1 text-slate-700"
                    >
                      Mortgage Amount
                    </FormLabel>
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
                      <FormControl>
                        <Input
                          id="amount"
                          type="number"
                          step="any"
                          {...field}
                          className={`pl-10 ${errors.amount && "border-Red"}`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Term */}
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="term"
                        className="block mb-1  text-slate-700"
                      >
                        Mortgage Term
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="term"
                            type="number"
                            {...field}
                            className={`pr-12 ${errors.term && "border-Red"}`}
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Interest Rate */}
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="rate"
                        className="block mb-1 text-slate-700"
                      >
                        Interest Rate
                      </FormLabel>
                      <div className="relative p-0">
                        <FormControl>
                          <Input
                            id="rate"
                            type="number"
                            step="0.01"
                            {...field}
                            className={`pr-10 ${errors.rate && "border-Red"}`}
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Mortgage Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-slate-700">
                      Mortgage Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="repayment"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col gap-2"
                      >
                        <Label
                          htmlFor="repayment"
                          className={`text-sm border p-3 selection:bg-Lime/20 text-slate-900 font-medium rounded mb-2 ${
                            field.value === "repayment"
                              ? "border-Lime bg-Lime/10"
                              : ""
                          }`}
                        >
                          <RadioGroupItem
                            value="repayment"
                            id="repayment"
                            className={`  h-4 w-4 border-2 transition ${
                              field.value === "repayment"
                                ? " border-Lime text-Lime data-[state=checked]:bg-Lime data-[state=checked]:border-Lime"
                                : ""
                            }`}
                          />
                          Repayment
                        </Label>
                        <Label
                          htmlFor="interest-only"
                          className={`text-sm border p-3 text-slate-900 font-medium rounded mb-4 ${
                            field.value === "interest-only"
                              ? "border-Lime bg-Lime/10"
                              : ""
                          }`}
                        >
                          <RadioGroupItem
                            value="interest-only"
                            id="interest-only"
                            className={`  h-4 w-4 border-2 transition ${
                              field.value === "interest-only"
                                ? " border-Lime text-Lime data-[state=checked]:bg-Lime data-[state=checked]:border-Lime"
                                : ""
                            }`}
                          />
                          Interest Only
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="hover:bg-Lime bg-Lime cursor md:w-2/3 text-slate-900 rounded-full text-base py-6"
              >
                <Calculator className="mr-2" size={20} />
                Calculate Repayments
              </Button>
            </form>
          </Form>
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
            <Card className="bg-slate-900 border-none">
              <CardHeader>
                <CardTitle className="text-white pb-2 text-3xl font-bold">
                  Your results
                </CardTitle>
                <CardDescription className="text-slate-300 pb-2">
                  Your results are shown below based on the information
                  provided. To adjust the results, edit the form and click
                  "calculate repayments" again.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border-t-8 border-t-Lime p-4 bg-slate-900">
                  <p className="text-slate-100/80">Your monthly repayment</p>
                  <h2 className="text-Lime">£{monthly}</h2>
                  <Separator className="my-4 bg-slate-300" />
                  <p className="text-slate-100/80">
                    Total you'll repay over the term
                  </p>
                  <h3 className="text-white">£{total}</h3>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
