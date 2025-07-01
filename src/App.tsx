import "./App.css";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Calculator } from "lucide-react";

function App() {
  const { register, handleSubmit, reset } = useForm();

  return (
    <main className="flex justify-center items-center bg-slate-100 w-full min-h-screen">
      <div className="grid grid-cols-2 md:flex-row bg-white max-w-3xl w-full rounded-2xl">
        {/* left on desktop  */}
        <div className="flex flex-col gap-4 p-4">
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
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
            <div>
              <Label htmlFor="amount" className="block mb-1 text-slate-700">
                Mortgage Amount
              </Label>
              <div className="relative">
                <span className="absolute left-[1.2px] top-1/2 -translate-y-1/2 text-slate-500 bg-slate-100 px-3 py-1 font-bold rounded-l-md h-[34px]">
                  £
                </span>
                <Input
                  id="amount"
                  type="number"
                  {...register("amount")}
                  className="pl-7 "
                />
              </div>
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
                    {...register("term")}
                    className="pr-10"
                  />
                  <span className="absolute right-[1px] top-1/2 -translate-y-1/2  px-2 py-1 font-bold text-sm text-slate-500 bg-slate-100 rounded-r-md h-[34px]">
                    years
                  </span>
                </div>
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
                    {...register("rate")}
                    className="pr-10"
                  />
                  <span className="absolute right-[1px] top-1/2 -translate-y-1/2  py-1 px-2 font-bold text-sm text-slate-500 bg-slate-100 rounded-r-md h-[34px]">
                    %
                  </span>
                </div>
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="hover:bg-Lime bg-Lime cursor w-full text-slate-900 rounded-full text-base py-6"
            >
              <Calculator className="mr-2" size={20} />
              Calculate Repayments
            </Button>
          </form>
        </div>

        {/* right side on desktop  */}
        <div className="bg-slate-900 w-full flex flex-col justify-center items-center  md:rounded-r-2xl md:rounded-bl-4xl p-5">
          <img
            src="/assets/images/illustration-empty.svg"
            alt="icon-calculator"
            className="object-fit"
          />
          <h2 className="text-white text-center">Result shown here</h2>
          <p className="text-slate-100/80am text-sm text-center mt-2">
            complete the form and click "calculate repayments" to see what your
            monthly repayments would be
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
