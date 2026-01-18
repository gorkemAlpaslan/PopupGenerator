import type { PopupConfig } from '@/types';

export function generateHTMLCode(config: PopupConfig): string {
  const storageKey = `popup_shown_${config.id}`;
  const triggerScript = `
    <script>
      (function() {
        const storageKey = '${storageKey}';
        const frequency = '${config.settings.frequency}';
        const frequencyCount = ${config.settings.frequencyCount || 1};
        
        // Check frequency
        function checkFrequency() {
          if (frequency === 'always') return true;
          const storage = frequency === 'once-per-session' ? sessionStorage : localStorage;
          const storedValue = storage.getItem(storageKey);
          
          let count = 0;
          if (storedValue === 'true') {
            count = 1;
          } else {
            count = parseInt(storedValue || '0');
            if (isNaN(count)) count = 0;
          }
          return count < frequencyCount;
        }

        if (!checkFrequency()) return;

        let isVisible = false;
        let hasShown = false;
        
        const config = {
          delay: ${config.triggers.delay},
          delayEnabled: ${config.triggers.delayEnabled ?? true},
          scrollPercent: ${config.triggers.scrollPercent},
          scrollEnabled: ${config.triggers.scrollEnabled ?? true},
          exitIntent: ${config.triggers.exitIntent}
        };

        function showPopup() {
          if (hasShown) return;
          hasShown = true;
          isVisible = true;
          document.getElementById('popup-overlay').style.display = 'flex';

          // Update frequency count
          if (frequency !== 'always') {
            const storage = frequency === 'once-per-session' ? sessionStorage : localStorage;
            const storedValue = storage.getItem(storageKey);
            
            let currentCount = 0;
            if (storedValue === 'true') {
              currentCount = 1;
            } else {
              currentCount = parseInt(storedValue || '0');
              if (isNaN(currentCount)) currentCount = 0;
            }
            storage.setItem(storageKey, (currentCount + 1).toString());
          }
        }

        function hidePopup() {
          isVisible = false;
          document.getElementById('popup-overlay').style.display = 'none';
        }

        // Delay trigger
        if (config.delayEnabled) {
          if (config.delay > 0) {
            setTimeout(showPopup, config.delay * 1000);
          } else {
             showPopup();
          }
        }

        // Scroll trigger
        if (config.scrollEnabled && config.scrollPercent > 0) {
          const scrollHandler = function() {
            if (hasShown) {
              window.removeEventListener('scroll', scrollHandler);
              return;
            }
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent >= config.scrollPercent && !isVisible) {
              showPopup();
              window.removeEventListener('scroll', scrollHandler);
            }
          };
          window.addEventListener('scroll', scrollHandler);
        }

        // Exit intent trigger
        if (config.exitIntent) {
          const exitHandler = function(e) {
            if (hasShown) {
              document.removeEventListener('mouseleave', exitHandler);
              return;
            }
            if (e.clientY <= 0) {
              showPopup();
              document.removeEventListener('mouseleave', exitHandler);
            }
          };
          document.addEventListener('mouseleave', exitHandler);
        }

        // Close handlers
        document.getElementById('popup-close').addEventListener('click', hidePopup);
        document.getElementById('popup-overlay').addEventListener('click', function(e) {
          if (e.target === this) {
            hidePopup();
          }
        });
      })();
    </script>`;

  // Content HTML (unstyled structure)
  const contentCore = `
        ${config.content.imageUrl ? `<img src="${config.content.imageUrl}" alt="${config.content.title}" style="width: 100%; height: 12rem; object-fit: cover; margin-bottom: 1rem; border-radius: ${config.style.borderRadius}px ${config.style.borderRadius}px 0 0;">` : ''}
        <div style="padding: 1.5rem;">
          <h2 style="margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: 700;">${config.content.title}</h2>
          ${config.content.description ? `<p style="margin-bottom: 1rem; font-size: 0.875rem;">${config.content.description}</p>` : ''}
          ${config.content.inputPlaceholder ? `<input type="email" placeholder="${config.content.inputPlaceholder}" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem;">` : ''}
          ${config.content.buttonText ? `<button id="popup-button" style="width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; color: white; background-color: ${config.style.buttonColor}; border: none; cursor: pointer;">${config.content.buttonText}</button>` : ''}
        </div>
        <button id="popup-close" style="position: absolute; right: 0.5rem; top: 0.5rem; padding: 0.25rem; border-radius: 9999px; color: #6b7280; background: none; border: none; cursor: pointer;">✕</button>`;

  // Card wrapper (for Modal and Floating)
  const popupCardHTML = `
      <div class="popup-content" style="position: relative; width: 100%; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); background-color: ${config.style.backgroundColor}; color: ${config.style.textColor}; border-radius: ${config.style.borderRadius}px;">
        ${contentCore}
      </div>`;

  const popupHTML = config.type === 'modal' ? `
    <div id="popup-overlay" class="popup-overlay" style="display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; padding: 1rem; background-color: rgba(0, 0, 0, ${config.style.overlayOpacity});">
      <div style="width: 100%; max-width: 28rem;">
        ${popupCardHTML}
      </div>
    </div>` : config.type === 'banner' ? `
    <div id="popup-overlay" class="popup-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; z-index: 9999; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); background-color: ${config.style.backgroundColor}; color: ${config.style.textColor}; border-radius: 0 0 ${config.style.borderRadius}px ${config.style.borderRadius}px;">
      <div style="max-width: 1280px; margin: 0 auto; padding: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="flex: 1;">
            <h3 style="font-weight: 600;">${config.content.title}</h3>
            ${config.content.description ? `<p style="margin-top: 0.25rem; font-size: 0.875rem;">${config.content.description}</p>` : ''}
          </div>
          <div style="margin-left: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ${config.content.buttonText ? `<button id="popup-button" style="padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; color: white; background-color: ${config.style.buttonColor}; border: none; cursor: pointer;">${config.content.buttonText}</button>` : ''}
            <button id="popup-close" style="padding: 0.25rem; border-radius: 9999px; color: #4b5563; background: none; border: none; cursor: pointer;">✕</button>
          </div>
        </div>
      </div>
    </div>` : config.type === 'slide-in' ? `
    <div id="popup-overlay" class="popup-overlay" style="display: none; position: fixed; right: 0; top: 0; bottom: 0; z-index: 9999; width: 100%; max-width: 24rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); background-color: ${config.style.backgroundColor}; color: ${config.style.textColor}; border-radius: ${config.style.borderRadius}px 0 0 ${config.style.borderRadius}px;">
      <div style="display: flex; height: 100%; flex-direction: column; position: relative;">
        ${config.content.imageUrl ? `<img src="${config.content.imageUrl}" alt="${config.content.title}" style="width: 100%; height: 12rem; object-fit: cover; border-radius: ${config.style.borderRadius}px 0 0 0;">` : ''}
        <div style="padding: 1.5rem;">
          <h2 style="margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: 700;">${config.content.title}</h2>
          ${config.content.description ? `<p style="margin-bottom: 1rem; font-size: 0.875rem;">${config.content.description}</p>` : ''}
          ${config.content.inputPlaceholder ? `<input type="email" placeholder="${config.content.inputPlaceholder}" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem;">` : ''}
          ${config.content.buttonText ? `<button id="popup-button" style="width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; color: white; background-color: ${config.style.buttonColor}; border: none; cursor: pointer;">${config.content.buttonText}</button>` : ''}
        </div>
        <button id="popup-close" style="position: absolute; right: 0.5rem; top: 0.5rem; padding: 0.25rem; border-radius: 9999px; color: #6b7280; background: none; border: none; cursor: pointer;">✕</button>
      </div>
    </div>` : `
    <div id="popup-overlay" class="popup-overlay" style="display: none; position: fixed; bottom: 1rem; right: 1rem; z-index: 9999; width: 20rem;">
      ${popupCardHTML}
    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name} Popup</title>
</head>
<body>
  ${popupHTML}
  ${triggerScript}
</body>
</html>`;
}
