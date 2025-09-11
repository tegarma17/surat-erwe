<?php

namespace App\Services\Surat;

use App\Models\Surat;
use App\Helpers\FormatHelper;
use App\Contracts\Services\Surat\SuratRenderInterface;

class DomisiliSuratRenderer implements SuratRenderInterface
{
    public function getTemplate(): string
    {
        return 'templates.surat_domisili';
    }

    public function getRequiredValidators(): array
    {
        return ['rt', 'rw'];
    }

    public function buildViewData(Surat $surat, array $jabatanData): array
    {
        return [
            'userDetail' => $surat->user,
            'nomor' => $surat->nomorSurat,
            'bulan' => FormatHelper::romawi($surat->created_at->month),
            'tahun' => $surat->created_at->year,
            'rt' => $jabatanData['rt'] ?? null,
        ];
    }
}
