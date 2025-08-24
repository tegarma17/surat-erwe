<!DOCTYPE html>
<html>
  <body>
    <div style="text-align: center; margin-bottom: 10px;">
      <div style="font-size: 20px; font-weight:bold">PEMERINTAH KABAPUTEN SIDOARJO</div>
      <div style="font-size: 20px; font-weight:bold; margin-top: 5px;">KELURAHAN GRABAGAN - KECAMATAN TULANGAN
      </div>
      <div style="font-size: 20px; font-weight:bold; margin-top: 5px;">RUKUN TETANGGA ( RT ) 54 - RUKUN WARGA ( RW ) 08  </div>
    </div>
    <div style="width: 100%; height: 4px; background-color: black; margin: 20px 0;"></div>

    <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 25px; text-align:center; font-weight:bold; text-decoration: underline; text-decoration-color: black;">SURAT KETERANGAN DOMISILI</div>
        <p style="margin-top: 5px;">Nomor: 400.7.22.1/SKET/VIII/2025</p>
    </div>
    <div style="text-align: justify; text-indent: 30px;">
        <p> Yang bertanda tangan di bawah ini Ketua Rukun Tetangga (RT) 54 - Rukun Warga (RW) 08 Kelurahan Grabagan
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
                        Wirausaha
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
                Ketua RW 08<br><br><br><br><br><br><br>
                <u>Drs. Ahmad Suryanto</u><br>

            </td>
            <td style="width: 50%; text-align: center;">
                Surabaya, 5 Agustus 2025<br>
                Ketua RT 03<br><br><br><br><br><br><br>
                <u>Rina Kartika, S.Pd</u><br>

            </td>
        </tr>
    </table>
  </body>
</html>
