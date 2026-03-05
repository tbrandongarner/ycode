'use client';

/**
 * Rename Layer Dialog
 *
 * Simple dialog to rename a layer by setting its customName.
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RenameLayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string | null) => void;
  currentName: string;
}

export default function RenameLayerDialog({
  open,
  onOpenChange,
  onConfirm,
  currentName,
}: RenameLayerDialogProps) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleConfirm = () => {
    const trimmed = name.trim();
    onConfirm(trimmed || null);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        width="320px"
        className="gap-0"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Rename layer</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4.5">
          <div className="flex flex-col gap-2">
            <Input
              id="layer-name"
              placeholder="Use default layer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <DialogFooter className="grid grid-cols-2 mt-1">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
            >
              Rename
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
