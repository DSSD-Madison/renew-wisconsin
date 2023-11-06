import { useState } from "react";
import clsx from "clsx";

import { Field, Label, Input } from "~/components/Form";

export default function Home() {
  const [busFormOpen, setBusFormOpen] = useState<boolean>(false);

  return (
    <main className="flex h-screen w-full">
      <div className="m-auto w-full max-w-sm">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
          <h1 className="text-lg font-semibold">Add a bus</h1>
          <button onClick={() => setBusFormOpen(!busFormOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={clsx(
                "h-5 w-5",
                busFormOpen ? "rotate-180" : "rotate-0",
              )}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <form
          className={clsx(
            "mt-4 flex flex-col gap-y-4",
            !busFormOpen && "hidden",
          )}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Price low</Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 ml-3 flex items-center text-sm text-neutral-500">
                      $
                    </span>
                    <Input
                      id={id}
                      name="price_low"
                      type="number"
                      min={0}
                      required
                      placeholder="0"
                      className="!mt-0 !pl-7"
                    />
                  </div>
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Price high</Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 ml-3 flex items-center text-sm text-neutral-500">
                      $
                    </span>
                    <Input
                      id={id}
                      name="price_high"
                      type="number"
                      min={0}
                      required
                      placeholder="0"
                      className="!mt-0 !pl-7"
                    />
                  </div>
                </>
              )}
            </Field>
          </div>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Company</Label>
                <Input
                  id={id}
                  name="company"
                  type="text"
                  required
                  placeholder="Company, Inc."
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Model</Label>
                <Input
                  id={id}
                  name="model"
                  type="text"
                  required
                  placeholder="Model"
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Max passenger capacity</Label>
                <Input
                  id={id}
                  name="max_passenger_capacity"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>GVWR</Label>
                <Input
                  id={id}
                  name="gvwr"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Max charge capacity (kWh)</Label>
                <Input
                  id={id}
                  name="max_charge_capacity"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Max range (miles)</Label>
                <Input
                  id={id}
                  name="max_range"
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                />
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Bidirectional charging</Label>
                <select
                  id={id}
                  name="bidirectional_charging"
                  className="mt-1 w-full appearance-none rounded-md border-0 px-3 py-2 text-sm shadow-sm outline-none ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-amber-300"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </>
            )}
          </Field>
          <Field>
            {(id) => (
              <>
                <Label htmlFor={id}>Charging port</Label>
                <Input
                  id={id}
                  name="charging_port"
                  type="text"
                  required
                  placeholder="Port"
                />
              </>
            )}
          </Field>
          <div>
            <p className="text-sm font-semibold">Charging type restrictions</p>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                id="2"
                name="charging_type_restrictions"
                value="2"
                className="rounded border-0 text-amber-300 shadow-sm ring-1 ring-inset ring-neutral-300 [&:checked]:ring-amber-300"
              />
              <label htmlFor="2" className="ml-2 text-sm">
                2
              </label>
            </div>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                id="3"
                name="charging_type_restrictions"
                value="3"
                className="rounded border-0 text-amber-300 shadow-sm ring-1 ring-inset ring-neutral-300 [&:checked]:ring-amber-300"
              />
              <label htmlFor="3" className="ml-2 text-sm">
                3
              </label>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
