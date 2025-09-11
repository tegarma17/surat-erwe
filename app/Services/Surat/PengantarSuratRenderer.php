<?php


namespace App\Services\Surat;


use App\Models\Surat;
use App\Helpers\FormatHelper;
use App\Contracts\Services\Surat\SuratRenderInterface;


class PengantarSuratRenderer implements SuratRenderInterface
{
    public function getTemplate(): string
    {
        return 'templates.surat_pengantar';
    }

    public function getRequiredValidators(): array
    {
        return ['rt', 'rw'];
    }

    public function buildViewData(Surat $surat, array $jabatanData): array
    {
        return [
            'userDetail' => $surat->userDetail,
            'surat' => $surat,
            'nomerSurat' => FormatHelper::romawi($surat->created_at->month),
            'tahun' => $surat->created_at->year,
            'rt' => $jabatanData['rt'] ?? null,
            'rw' => $jabatanData['rw'] ?? null,
        ];
    }
}
