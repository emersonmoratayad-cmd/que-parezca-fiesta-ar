# Que Parezca Fiesta | WebAR v3

Prototipo móvil de Realidad Aumentada con seguimiento de imagen mediante MindAR + A-Frame. El video MP4 se reproduce como textura dentro de un plano vertical 3D, anclado a la tarjeta impresa.

## Estado del proyecto

- Marcador MindAR recibido e integrado: `assets/que-parezca-fiesta.mind`.
- Video MP4 integrado: `assets/fiesta_hambuger.mp4`.
- Pantalla vertical flotante en AR.
- Reproducción y pausa del video en el plano 3D.
- Reproductor oficial de TikTok como alternativa desde la pantalla inicial.
- Configuración de publicación en Netlify incluida.

## Archivos principales

- `index.html`: estructura y escena AR.
- `styles.css`: diseño visual adaptable a móviles.
- `app.js`: cámara, seguimiento, reproducción y controles.
- `assets/marcador-que-parezca-fiesta.png`: imagen que se debe imprimir y reconocer.
- `assets/que-parezca-fiesta.mind`: archivo de reconocimiento ya integrado.
- `assets/fiesta_hambuger.mp4`: video que aparece en la pantalla AR.

## Publicar en Netlify mediante GitHub

1. Descarga y descomprime el ZIP del proyecto.
2. Crea un repositorio en GitHub, por ejemplo `que-parezca-fiesta-webar`.
3. Sube **todo el contenido** de esta carpeta, incluyendo `assets/que-parezca-fiesta.mind` y `assets/fiesta_hambuger.mp4`.
4. Entra a https://app.netlify.com/ y selecciona **Add new project** > **Import an existing project**.
5. Conecta GitHub y selecciona el repositorio.
6. Configura: Build command vacío y Publish directory `.`.
7. Pulsa **Deploy**.
8. Abre la URL HTTPS generada en un teléfono y permite el acceso a la cámara.

Netlify también permite publicación manual desde https://app.netlify.com/drop arrastrando la carpeta descomprimida. Para futuras actualizaciones es más cómodo conectar GitHub.

## Preparar la tarjeta física

1. Imprime `assets/marcador-que-parezca-fiesta.png` en papel mate, preferiblemente a color y sin bordes adicionales.
2. Para la primera prueba utiliza aproximadamente 12 × 12 cm. Mantén toda la imagen visible, plana y sin reflejos.
3. Coloca la tarjeta sobre la mesa con buena iluminación.
4. Abre la dirección HTTPS de Netlify en el teléfono, pulsa **Activar realidad aumentada** y enfoca la tarjeta completa.
5. Cuando aparezca el panel flotante, pulsa **Reproducir video** o toca el panel.

No rediseñes la imagen del marcador después de compilar el `.mind`. Si cambias la imagen, tendrás que compilar un nuevo archivo `.mind`.

## Probar localmente

No abras `index.html` con doble clic. El acceso a cámara requiere HTTPS o localhost. Desde esta carpeta puedes ejecutar:

```bash
python -m http.server 8000
```

La prueba en un teléfono requiere una dirección HTTPS accesible desde ese teléfono; la opción más sencilla es publicar primero en Netlify.

## Cambiar el video MP4

1. Sustituye `assets/fiesta_hambuger.mp4` por otro MP4 compatible (H.264 recomendado).
2. Conserva el nombre `fiesta_hambuger.mp4` o actualiza la ruta del atributo `src` del elemento `arVideo` en `index.html`.
3. Publica los cambios en GitHub para que Netlify despliegue la nueva versión.

El video se reproduce dentro de la superficie 3D. Se inicia después de una interacción del usuario para respetar las políticas de reproducción de los navegadores móviles.

## TikTok como alternativa

La pantalla inicial conserva el reproductor oficial embebido de TikTok y un enlace a la publicación original. El contenido de un iframe de TikTok no puede convertirse directamente en textura WebGL por las restricciones de origen cruzado; por eso el video MP4 proporcionado se utiliza para la reproducción dentro del plano 3D.

El reproductor de TikTok está documentado en: https://developers.tiktok.com/docs/en/embed-player

## Requisitos y notas

- Teléfono con navegador moderno y cámara.
- Publicación HTTPS y permiso de cámara concedido.
- Buena iluminación y tarjeta plana, mate y sin reflejos.
- Conexión a Internet: A-Frame y MindAR se cargan desde CDN y las fuentes web son externas.
- La experiencia debe probarse en dispositivos Android y iPhone reales antes de utilizarse con clientes. El comportamiento puede variar según navegador, cámara y políticas de permisos.

## Estructura

```text
que-parezca-fiesta-webar/
├── index.html
├── styles.css
├── app.js
├── netlify.toml
├── README.md
└── assets/
    ├── fiesta_hambuger.mp4
    ├── marcador-que-parezca-fiesta.png
    ├── panel-texture.svg
    └── que-parezca-fiesta.mind
```
