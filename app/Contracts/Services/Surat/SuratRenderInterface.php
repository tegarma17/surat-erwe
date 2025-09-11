<?php

namespace App\Contracts\Services\Surat;



use App\Models\Surat;

interface SuratRenderInterface
{
    public function getTemplate(): string;

    public function getRequiredValidators(): array;

    public function buildViewData(Surat $surat, array $jabatanData): array;
}
