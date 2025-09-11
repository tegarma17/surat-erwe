<?php

namespace App\Services\Surat;

use App\Contracts\Services\Surat\SuratRenderInterface;

class SuratRendererFactory
{
    public static function make(string $kodeSurat): SuratRenderInterface
    {
        return match ($kodeSurat) {
            'SKET' => new SKETSuratRenderer(),
            'SPEN' => new PengantarSuratRenderer(),
            default => new DomisiliSuratRenderer(),

        };
    }
}
