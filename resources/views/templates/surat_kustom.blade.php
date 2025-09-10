<!DOCTYPE html>
<html>
  <body>
    <div style="text-align: center; margin-bottom: 10px;">
      <div style="font-size: 20px; font-weight:bold">PEMERINTAH KABAPUTEN SIDOARJO</div>
      <div style="font-size: 20px; font-weight:bold; margin-top: 5px;">KELURAHAN GRABAGAN - KECAMATAN TULANGAN
      </div>
      <div style="font-size: 20px; font-weight:bold; margin-top: 5px;">RUKUN TETANGGA ( RT ) {{ $userDetail->rt->nomer }} - RUKUN WARGA ( RW ) {{ $userDetail->rt->rw->nomer }}  </div>
    </div>
    <div style="width: 100%; height: 4px; background-color: black; margin: 20px 0;"></div>

    <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 25px; text-align:center; font-weight:bold; text-decoration: underline; text-decoration-color: black;">SURAT KETERANGAN</div>
        <p style="margin-top: 5px;">Nomor: {{ sprintf('%03d', $surat->id) }}/{{ $surat->jenisSurat->kd_surat }}/{{ $nomerSurat }}/{{ 2025 }}</p>
    </div>
    <div style="text-align: justify; text-indent: 30px;">
        <p> Yang bertanda tangan di bawah ini Ketua Rukun Tetangga (RT) {{ $userDetail->rt->nomer }} - Rukun Warga (RW) {{ $userDetail->rt->rw->nomer }} Kelurahan Grabagan
            , Kecamatan Tulangan, Kabupaten Sidoarjo, menerangkan bahwa:
        </p>
    </div>
            <table style="width: 75%; border-collapse: collapse; ">
                <tr>
                    <td style="width: 50%; text-align: left;">
                        Nama
                    </td>
                    <td style="width: 5%">
                        :
                    </td>
                    <td style="width: 65%">
                       {{ $userDetail->nama }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                        NIK
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                        {{ $userDetail->nik }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                        Tempat, Tanggal Lahir
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                        {{ $userDetail->tmpt_lahir }}, {{ \Carbon\Carbon::parse($userDetail->tgl_lahir)->locale('id')->translatedFormat('d F Y') }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                       Jenis Kelamin
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                        {{ $userDetail->jk == 'l' ? 'Laki-laki' : 'Perempuan' }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                        Alamat
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                       {{ $userDetail->alamat }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                        Agama
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                       {{ ucfirst($userDetail->agama) }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                       Pekerjaan
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                        {{ $userDetail->pekerjaan }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 30%; text-align: left; padding-top: 10px;">
                       Keperluan
                    </td>
                    <td style="width: 1%">
                        :
                    </td>
                    <td style="width: 60%">
                        {{ $surat->alasan }}
                    </td>
                </tr>
            </table>
        <p>Adalah benar warga yang berdomisili di alamat tersebut di atas.</p>
        <p> Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana
        mestinya. </p>
    <br>

    <table style="width: 100%; margin-top: 30px;">
        <tr>
            <td style="width: 50%; text-align: center;">
                Mengetahui,<br>
                Ketua RW {{ $rt->warga->rt->rw->nomer }}<br><br><br><br><br><br><br>
                <u>{{ $rt->warga->nama }}</u><br>

            </td>
            <td style="width: 50%; text-align: center;">
                Sidoarjo, {{ \Carbon\Carbon::parse($surat->created_at)->locale('id')->translatedFormat('d F Y') }}<br>
                Ketua RT {{ $userDetail->rt->nomer }}<br><br><br><br><br><br><br>
                <u>{{ $rw->warga->nama }}</u><br>

            </td>
        </tr>
    </table>
  </body>
</html>
