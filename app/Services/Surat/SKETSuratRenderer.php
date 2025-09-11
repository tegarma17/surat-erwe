<?php

namespace App\Services\Surat;

use App\Contracts\Services\Surat\SuratRenderInterface;
use App\Helpers\FormatHelper;
use App\Models\Surat;

class SKETSuratRenderer implements SuratRenderInterface
{
    public function getTemplate(): string
    {
        return 'templates.surat_kustom';
    }

    public function getRequiredValidators(): array
    {
        return ['rt', 'rw'];
    }

    public function buildViewData(Surat $surat, array $jabatanData): array
    {
        return [
            'userDetail' => $surat->warga,
            'surat' => $surat->jenisSurat,
            'nomerSurat' => FormatHelper::romawi($surat->created_at->month),
            'tahun' => $surat->created_at->year,
            'rt' => $jabatanData['rt'] ?? null,
            'rw' => $jabatanData['rw'] ?? null,
        ];
    }
}
