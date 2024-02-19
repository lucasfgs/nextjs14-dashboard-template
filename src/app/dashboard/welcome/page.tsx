import {
  StepMenu,
  StepMenuContent,
  StepMenuFooter,
  StepMenuHeader,
  StepMenuNextTrigger,
  StepMenuPreviousTrigger,
  StepMenuProgressBar,
  StepMenuStep,
} from "@/components/custom/StepMenu";

export default function Welcome() {
  return (
    <div className="">
      <div className="flex justify-center items-center p-4">
        <StepMenu totalSteps={3} className="w-96">
          <StepMenuProgressBar variant="line" />
          <StepMenuHeader>
            <h1 className="text-lg font-semibold text-muted-foreground">
              Menu
            </h1>
          </StepMenuHeader>
          <StepMenuContent className="min-h-80">
            <StepMenuStep step={1}>
              <p className="text-sm text-muted-foreground">Step 1</p>
            </StepMenuStep>
            <StepMenuStep step={2}>
              <p className="text-sm text-muted-foreground">Step 2</p>
            </StepMenuStep>
            <StepMenuStep step={3}>
              <p className="text-sm text-muted-foreground">Step 3</p>
            </StepMenuStep>
          </StepMenuContent>
          <StepMenuFooter className="flex justify-end space-x-3">
            <StepMenuPreviousTrigger variant={"outline"}>
              Previous
            </StepMenuPreviousTrigger>
            <StepMenuNextTrigger>Next</StepMenuNextTrigger>
          </StepMenuFooter>
        </StepMenu>
      </div>
    </div>
  );
}
