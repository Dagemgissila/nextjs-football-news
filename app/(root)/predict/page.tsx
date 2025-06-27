"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";

export interface UserInfo {
  name: string;
  gender: string;
  age: number | string;
  career: string;
  personality: string;
  preferences: string[];
  loveExpectation: string;
  idealDuration: string;
}

export interface PersonInput {
  name: string;
  age: number | string;
  career: string;
  personality: string;
  lovePercent: number | string;
  dated: boolean;
  datingDuration: string;
}

const PREFERENCE_OPTIONS = [
  "Kind",
  "Funny",
  "Loyal",
  "Ambitious",
  "Adventurous",
];

export default function PredictPage() {
  const [user, setUser] = useState<UserInfo>({
    name: "",
    gender: "",
    age: "",
    career: "",
    personality: "",
    preferences: [],
    loveExpectation: "",
    idealDuration: "",
  });

  const [people, setPeople] = useState<PersonInput[]>([
    {
      name: "",
      age: "",
      career: "",
      personality: "",
      lovePercent: "",
      dated: false,
      datingDuration: "",
    },
    {
      name: "",
      age: "",
      career: "",
      personality: "",
      lovePercent: "",
      dated: false,
      datingDuration: "",
    },
    {
      name: "",
      age: "",
      career: "",
      personality: "",
      lovePercent: "",
      dated: false,
      datingDuration: "",
    },
  ]);

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleUserChange = (
    field: keyof UserInfo,
    value: string | number | boolean | string[]
  ) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const togglePreference = (pref: string) => {
    setUser((prev) => {
      const exists = prev.preferences.includes(pref);
      const newPrefs = exists
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref];
      return { ...prev, preferences: newPrefs };
    });
  };

  const handleChange = (
    index: number,
    field: keyof PersonInput,
    value: string | boolean | number
  ) => {
    const updated = [...people];
    updated[index][field] = value as never;
    setPeople(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, people }),
      });
      const data = await res.json();
      setTimeout(() => {
        toast.error(
          "Our server is currently handling many requests, please try later."
        );
      }, 5000);
      setResult(data.result || "Something went wrong.");
    } catch (err) {
      console.error(err);
      setResult("Failed to submit prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">
        💖 AI Marriage Prediction
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-8 bg-white p-8 rounded-3xl shadow-lg"
      >
        {/* User Personal Info */}
        <section className="border border-pink-300 p-6 rounded-xl bg-pink-100 space-y-6">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">
            🧍 Please Provide Your Personal Details
          </h2>

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="userName"
          >
            Your Full Name
          </label>
          <input
            id="userName"
            required
            type="text"
            placeholder="Enter your name"
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
            onChange={(e) => handleUserChange("name", e.target.value)}
          />

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="userGender"
          >
            Your Gender
          </label>
          <select
            id="userGender"
            required
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 transition"
            onChange={(e) => handleUserChange("gender", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="userAge"
          >
            Your Age
          </label>
          <input
            id="userAge"
            required
            type="number"
            min={0}
            max={120}
            placeholder="Enter your age"
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
            onChange={(e) => handleUserChange("age", Number(e.target.value))}
          />

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="userCareer"
          >
            Career Status
          </label>
          <select
            id="userCareer"
            required
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 transition"
            onChange={(e) => handleUserChange("career", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Career Status
            </option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="unemployed">Unemployed</option>
          </select>

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="userPersonality"
          >
            Describe Your Personality
          </label>
          <textarea
            id="userPersonality"
            required
            placeholder="E.g., friendly, outgoing, thoughtful..."
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition resize-none"
            rows={4}
            onChange={(e) => handleUserChange("personality", e.target.value)}
          />

          <fieldset className="space-y-2">
            <legend className="font-semibold text-pink-700 mb-2">
              Preferred Traits In Partner
            </legend>
            <div className="flex flex-wrap gap-4">
              {PREFERENCE_OPTIONS.map((pref) => (
                <label
                  key={pref}
                  className="inline-flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    required={user.preferences.length === 0} // Require at least one
                    checked={user.preferences.includes(pref)}
                    onChange={() => togglePreference(pref)}
                    className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
                  />
                  <span className="text-pink-900">{pref}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="loveExpectation"
          >
            What Kind of Love Do You Expect?
          </label>
          <select
            id="loveExpectation"
            required
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 transition"
            onChange={(e) =>
              handleUserChange("loveExpectation", e.target.value)
            }
            defaultValue=""
          >
            <option value="" disabled>
              Select Love Expectation
            </option>
            <option value="passionate">Passionate Love</option>
            <option value="deep trust">Deep Trust</option>
            <option value="long-term">Long-Term Commitment</option>
          </select>

          <label
            className="block text-pink-800 font-medium mb-1"
            htmlFor="idealDuration"
          >
            Ideal Dating Duration Before Marriage
          </label>
          <select
            id="idealDuration"
            required
            className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 transition"
            onChange={(e) => handleUserChange("idealDuration", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Ideal Duration
            </option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2+ years">2+ years</option>
          </select>
        </section>

        <h1 className="text-xl font-semibold text-pink-700 mb-4">
          Please provide details of the people you are currently dating — we
          will predict who matches best with you.
        </h1>

        {/* People Info */}
        {people.map((person, i) => (
          <section
            key={i}
            className="border border-pink-300 p-6 rounded-xl bg-rose-50 space-y-4"
          >
            <h2 className="text-lg font-semibold text-pink-700 mb-2">
              Person {i + 1}
            </h2>

            <label
              className="block text-pink-800 font-medium mb-1"
              htmlFor={`personName${i}`}
            >
              Name
            </label>
            <input
              id={`personName${i}`}
              required
              type="text"
              placeholder="Name"
              className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />

            <label
              className="block text-pink-800 font-medium mb-1"
              htmlFor={`personAge${i}`}
            >
              Age
            </label>
            <input
              id={`personAge${i}`}
              required
              type="number"
              min={0}
              max={120}
              placeholder="Age"
              className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
              onChange={(e) => handleChange(i, "age", Number(e.target.value))}
            />

            <label
              className="block text-pink-800 font-medium mb-1"
              htmlFor={`personCareer${i}`}
            >
              Career Status
            </label>
            <select
              id={`personCareer${i}`}
              required
              className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 transition"
              onChange={(e) => handleChange(i, "career", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Career
              </option>
              <option value="student">Student</option>
              <option value="employee">Employee</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="unemployed">Unemployed</option>
            </select>

            <label
              className="block text-pink-800 font-medium mb-1"
              htmlFor={`personPersonality${i}`}
            >
              Describe Personality
            </label>
            <textarea
              id={`personPersonality${i}`}
              required
              placeholder="E.g., outgoing, caring..."
              className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition resize-none"
              rows={3}
              onChange={(e) => handleChange(i, "personality", e.target.value)}
            />

            <label
              className="block text-pink-800 font-medium mb-1"
              htmlFor={`personLovePercent${i}`}
            >
              How Much Do They Love You? (0-100%)
            </label>
            <input
              id={`personLovePercent${i}`}
              required
              type="number"
              min={0}
              max={100}
              placeholder="Love Percentage"
              className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
              onChange={(e) =>
                handleChange(i, "lovePercent", Number(e.target.value))
              }
            />

            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={person.dated}
                onChange={(e) => handleChange(i, "dated", e.target.checked)}
                className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
              />
              <span className="text-pink-900">Have you dated this person?</span>
            </label>

            {person.dated && (
              <>
                <label
                  className="block text-pink-800 font-medium mb-1"
                  htmlFor={`personDatingDuration${i}`}
                >
                  For How Long?
                </label>
                <input
                  id={`personDatingDuration${i}`}
                  required
                  placeholder="e.g., 2 years,10 months"
                  className="w-full border border-pink-400 focus:border-pink-600 outline-none p-3 rounded-lg bg-white text-pink-900 placeholder-pink-400 transition"
                  onChange={(e) =>
                    handleChange(i, "datingDuration", e.target.value)
                  }
                />
              </>
            )}
          </section>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg font-semibold py-4 rounded-xl transition"
        >
          {loading ? "Predicting..." : "Predict Who Will Marry 💍"}
        </button>

        {result && (
          <p className="text-center text-xl text-pink-800 mt-6 font-semibold">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}
