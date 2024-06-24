import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

// UI component types
type SliderProps = SliderPrimitive.SliderProps & {
  onValueChange: (value: number[]) => void;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

// Stub UI components (replace these with your actual UI library components)
const Slider: React.FC<SliderProps> = ({ onValueChange, ...props }) => (
  <SliderPrimitive.Root
    className="relative flex items-center select-none touch-none w-full h-5"
    onValueChange={onValueChange}
    {...props}
  >
    <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
      <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-5 h-5 bg-blue-500 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75" />
  </SliderPrimitive.Root>
);

const Input: React.FC<InputProps> = (props) => (
  <input
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    {...props}
  />
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
      ${
        variant === "default"
          ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
          : "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border border-gray-300"
      }`}
    {...props}
  >
    {children}
  </button>
);

const GlassesAdjustmentApp: React.FC = () => {
  const [sphereLeft, setSphereLeft] = useState<number>(0);
  const [sphereRight, setSphereRight] = useState<number>(0);
  const [cylinderLeft, setCylinderLeft] = useState<number>(0);
  const [cylinderRight, setCylinderRight] = useState<number>(0);
  const [adjusted, setAdjusted] = useState<boolean>(false);

  const handleAdjust = () => {
    setAdjusted(true);
  };

  const handleReset = () => {
    setSphereLeft(0);
    setSphereRight(0);
    setCylinderLeft(0);
    setCylinderRight(0);
    setAdjusted(false);
  };

  const getBlurAmount = (): string => {
    const avgSphere = (Math.abs(sphereLeft) + Math.abs(sphereRight)) / 2;
    const avgCylinder = (Math.abs(cylinderLeft) + Math.abs(cylinderRight)) / 2;
    return adjusted ? `${(avgSphere + avgCylinder) * 0.5}px` : "0px";
  };

  const getTextSize = (): string => {
    const avgPrescription =
      (Math.abs(sphereLeft) +
        Math.abs(sphereRight) +
        Math.abs(cylinderLeft) +
        Math.abs(cylinderRight)) /
      4;
    return adjusted ? `${100 + avgPrescription * 5}%` : "100%";
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Glasses Adjustment App</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Left Eye Sphere
          </label>
          <Slider
            min={-10}
            max={10}
            step={0.25}
            value={[sphereLeft]}
            onValueChange={(value) => setSphereLeft(value[0])}
          />
          <Input
            type="number"
            value={sphereLeft}
            onChange={(e) => setSphereLeft(parseFloat(e.target.value))}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Right Eye Sphere
          </label>
          <Slider
            min={-10}
            max={10}
            step={0.25}
            value={[sphereRight]}
            onValueChange={(value) => setSphereRight(value[0])}
          />
          <Input
            type="number"
            value={sphereRight}
            onChange={(e) => setSphereRight(parseFloat(e.target.value))}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Left Eye Cylinder
          </label>
          <Slider
            min={-10}
            max={10}
            step={0.25}
            value={[cylinderLeft]}
            onValueChange={(value) => setCylinderLeft(value[0])}
          />
          <Input
            type="number"
            value={cylinderLeft}
            onChange={(e) => setCylinderLeft(parseFloat(e.target.value))}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Right Eye Cylinder
          </label>
          <Slider
            min={-10}
            max={10}
            step={0.25}
            value={[cylinderRight]}
            onValueChange={(value) => setCylinderRight(value[0])}
          />
          <Input
            type="number"
            value={cylinderRight}
            onChange={(e) => setCylinderRight(parseFloat(e.target.value))}
            className="mt-2"
          />
        </div>
        <div className="space-x-2">
          <Button onClick={handleAdjust}>Adjust Screen</Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
      <div
        className="mt-8 p-4 border rounded-md"
        style={{
          filter: `blur(${getBlurAmount()})`,
          fontSize: getTextSize(),
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2 className="text-xl font-semibold mb-2">Adjusted Content</h2>
        <p>
          This text and content will adjust based on your inputted prescription.
          The blur and text size will change to simulate how it might appear
          without glasses.
        </p>
      </div>
    </div>
  );
};

export default GlassesAdjustmentApp;
