"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { providers } from "./calculatorData";
import Hero from "./Hero";
import Partners from "./Partners";
import Benefits from "./Benefits";
import Transparency from "./Transparency";
import Comparison from "./Comparison";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import RemittanceCalculator from "./RemittanceCalculator";
import CTASection from "./CTASection";

export default function HomePageContent() {
  const [selectedProviderId, setSelectedProviderId] = useState("sendwave");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const customAmountDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const customAmountSource = useRef<"hero" | "main" | null>(null);

  useEffect(() => {
    return () => {
      if (customAmountDebounce.current) {
        clearTimeout(customAmountDebounce.current);
      }
    };
  }, []);

  const handleProviderSelect = useCallback((source: "hero" | "main", providerId: string) => {
    setSelectedProviderId(providerId);
    const providerName =
      providers.find((provider) => provider.id === providerId)?.name ?? providerId;

    sendGAEvent("event", source === "hero" ? "hero_calculator_provider_selected" : "provider_selected", {
      provider_name: providerName,
      amount,
    });
  }, [amount]);

  const handlePresetSelect = useCallback((source: "hero" | "main", value: number) => {
    if (customAmountDebounce.current) {
      clearTimeout(customAmountDebounce.current);
      customAmountDebounce.current = null;
    }

    customAmountSource.current = null;
    setAmount(value);
    setIsCustom(false);
    setCustomAmount("");
    sendGAEvent(
      "event",
      source === "hero" ? "hero_calculator_amount_preset_clicked" : "amount_preset_clicked",
      { amount: value }
    );
  }, []);

  const handleCustomAmountChange = useCallback((source: "hero" | "main", value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    customAmountSource.current = source;

    const parsed = parseFloat(value);
    if (Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    setAmount(parsed);
    if (customAmountDebounce.current) {
      clearTimeout(customAmountDebounce.current);
    }

    customAmountDebounce.current = setTimeout(() => {
      const eventName =
        source === "hero"
          ? "hero_calculator_custom_amount_entered"
          : "custom_amount_entered";
      sendGAEvent("event", eventName, { amount: parsed });
      customAmountDebounce.current = null;
    }, 500);
  }, []);

  const handleCustomAmountBlur = useCallback((source: "hero" | "main") => {
    if (!customAmountDebounce.current) {
      return;
    }

    clearTimeout(customAmountDebounce.current);
    customAmountDebounce.current = null;

    const parsed = parseFloat(customAmount);
    if (!Number.isNaN(parsed) && parsed > 0) {
      const eventName =
        (customAmountSource.current ?? source) === "hero"
          ? "hero_calculator_custom_amount_entered"
          : "custom_amount_entered";
      sendGAEvent("event", eventName, { amount: parsed });
    }

    customAmountSource.current = null;
  }, [customAmount]);

  const sharedCalculatorProps = {
    amount,
    customAmount,
    isCustom,
    onCustomAmountBlur: handleCustomAmountBlur,
    onCustomAmountChange: handleCustomAmountChange,
    onPresetSelect: handlePresetSelect,
    onProviderSelect: handleProviderSelect,
    selectedProviderId,
  };

  return (
    <>
      <Hero {...sharedCalculatorProps} />
      <RemittanceCalculator {...sharedCalculatorProps} />
      <Partners />
      <Benefits />
      <Transparency />
      <Comparison />
      <HowItWorks />
      <FAQ />
      <CTASection />
    </>
  );
}
