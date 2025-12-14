import { Plus } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import If from "@/components/ui/if";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fieldTypes } from "@/constants";

type FieldSelectorProps = {
  addFormField: (variant: string, index?: number) => void;
};

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  addFormField,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Available Fields</h3>
        <p className="text-xs text-muted-foreground">
          Click to add a field to your form
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        {fieldTypes.map((variant) => (
          <TooltipProvider key={variant.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => addFormField(variant.name, variant.index)}
                  className="w-full justify-start gap-2 h-10 transition-all hover:bg-accent hover:border-primary"
                >
                  <Plus className="h-4 w-4" />
                  <span className="flex-1 text-left text-sm font-medium">
                    {variant.name}
                  </span>
                  <If
                    condition={variant.isNew}
                    render={() => (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 ml-auto"
                      >
                        New
                      </Badge>
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                Add {variant.name} field
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
