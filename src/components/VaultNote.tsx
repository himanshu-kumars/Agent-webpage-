"use client";

import React, { useState } from "react";
import type { DecryptedVaultItem } from "@/lib/crypto";
import { CornerBrackets } from "./CornerBrackets";
import { Stamp } from "./Stamp";

export interface VaultNoteProps {
  note: DecryptedVaultItem;
  onDelete: (id: string) => void;
}

/**
 * AEGIS // OPS GRID — Decrypted Field Note + Raw Ciphertext Verification Card (<VaultNote />) (FR-013)
 */
export function VaultNote({ note, onDelete }: VaultNoteProps) {
  const [showCipherProof, setShowCipherProof] = useState(false);

  return (
    <article className="relative rounded-[2px] border border-[#3ee0ff]/30 bg-[#0a1322]/90 p-4">
      <CornerBrackets tone="cyan" />

      <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2 border-b border-[#3ee0ff]/15 pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-[11px] text-[#39ff9d]">[{note.id}]</span>
            <Stamp
              label={note.classification}
              tone={
                note.classification === "EYES ONLY"
                  ? "red"
                  : note.classification === "ORCON"
                  ? "amber"
                  : "cyan"
              }
            />
          </div>
          <h3 className="mt-1 font-display text-sm font-bold tracking-wider text-[#e6f1ff]">
            {note.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono-tech text-[11px]">
          <span className="text-[#8da4c4]">{note.createdAt.slice(0, 19)}Z</span>
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            aria-label={`Delete field note ${note.title}`}
            className="rounded-[2px] border border-[#ff3b4e]/45 bg-[#ff3b4e]/10 px-2 py-0.5 text-[#ff3b4e] uppercase hover:bg-[#ff3b4e] hover:text-[#04070d]"
          >
            SHRED
          </button>
        </div>
      </div>

      <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed text-[#e6f1ff]">
        {note.body}
      </p>

      {/* Collapsible AES-256-GCM At-Rest Verification Drawer */}
      <div className="border-t border-[#3ee0ff]/15 pt-2">
        <button
          type="button"
          aria-expanded={showCipherProof}
          onClick={() => setShowCipherProof((prev) => !prev)}
          className="font-mono-tech text-[11px] tracking-widest text-[#3ee0ff] uppercase hover:underline"
        >
          {showCipherProof
            ? "[-] HIDE AT-REST AES-256-GCM CIPHERTEXT PROOF"
            : "[+] INSPECT AT-REST AES-256-GCM CIPHERTEXT PROOF (ZERO PLAINTEXT IN STORAGE)"}
        </button>

        {showCipherProof && (
          <div className="mt-2 space-y-1 rounded-[2px] border border-[#3ee0ff]/20 bg-[#04070d] p-2.5 font-mono-tech text-[11px] text-[#8da4c4]">
            <div>
              <span className="text-[#39ff9d]">ALGORITHM :</span> AES-256-GCM (128-bit Auth Tag) //
              PBKDF2-SHA256 (310,000 Iterations)
            </div>
            <div className="break-all">
              <span className="text-[#ffb454]">IV (96b)  :</span> {note.iv}
            </div>
            <div className="break-all">
              <span className="text-[#3ee0ff]">SALT(128b):</span> {note.salt}
            </div>
            <div className="break-all">
              <span className="text-[#e6f1ff]">CIPHERTEXT:</span> {note.ciphertext}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
