# Acıbadem Bilgi Ofisleri Haritası

Bu proje, dünya genelindeki Acıbadem bilgi ofislerini interaktif bir harita üzerinde gösteren bir web uygulamasıdır. Kullanıcıların ofisleri ülke bazında filtrelemesine ve yoğun bölgelerdeki ofisleri kümelenmiş olarak görmesine olanak tanır.

## Önizleme

*Projenizin bir ekran görüntüsünü alıp reponuza yükledikten sonra aşağıdaki satırdaki `path/to/screenshot.png` kısmını resminizin yoluyla güncelleyebilirsiniz.*

![Harita Önizlemesi](path/to/screenshot.png)

## Özellikler

- **İnteraktif Harita Arayüzü:** Kaydırılabilir ve yakınlaştırılabilir modern bir harita.
- **Özelleştirilmiş İkonlar:** Standart harita pinleri yerine Acıbadem logosu kullanılır.
- **Pin Kümeleme (Marker Clustering):** Harita uzaklaştırıldığında birbirine yakın olan ofisler, üzerinde sayı yazan tek bir küme içinde gruplanır, bu da haritanın okunabilirliğini artırır.
- **Ülkeye Göre Filtreleme:** Açılır menüden bir ülke seçildiğinde, harita otomatik olarak o ülkedeki ofisleri gösterecek şekilde yakınlaşır.
- **Tıklanabilir İletişim Bilgileri:** Her bir ofisin üzerine tıklandığında açılan bilgi penceresindeki telefon numaraları, mobil cihazlarda doğrudan arama yapmak için tıklanabilir özelliktedir.
- **Minimalist Harita Stili:** Verilerin ön planda olmasını sağlayan, sade ve profesyonel bir CARTO Positron altlık haritası kullanılmıştır.

## Kullanılan Teknolojiler

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **[Leaflet.js](https://leafletjs.com/):** Açık kaynaklı, interaktif haritalar için lider JavaScript kütüphanesi.
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster):** Leaflet için pinleri kümeleme eklentisi.
- **[CARTO](https://carto.com/):** Harita altlıkları (tile layers) için servis sağlayıcı.

## Kurulum ve Kullanım

Bu proje, herhangi bir sunucu veya kurulum gerektirmeyen, tek bir HTML dosyasından oluşmaktadır.

1.  Repoyu bilgisayarınıza klonlayın:
    ```bash
    git clone [https://github.com/kullanici-adiniz/repo-adiniz.git](https://github.com/kullanici-adiniz/repo-adiniz.git)
    ```
2.  Proje klasörüne gidin.
3.  `office_map.html` dosyasını herhangi bir modern web tarayıcısında (Google Chrome, Firefox, vb.) açın.

## Veri Kaynağı

Ofis konumları, telefon numaraları ve diğer bilgiler, `office_map.html` dosyası içerisindeki `officeList` adlı JavaScript dizisinde statik olarak tutulmaktadır. Koordinatlar, şehir merkezleri baz alınarak yaklaşık olarak belirlenmiştir.
