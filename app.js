/* ==========================================================================
   OmniTools Hub - Core Application Logic
   Features: SEO/OGP Generator, High-Res QR Generator, JSON/Text Suite, Crypto Pass Gen
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigationTabs();
    initOgpTool();
    initQrTool();
    initTextJsonTool();
    initPasswordTool();
    initSupportModal();
    initAdToggle();
});

/* --------------------------------------------------------------------------
   1. Tab Navigation Controller
   -------------------------------------------------------------------------- */
function initNavigationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tool-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. OGP & SEO Meta Tag Generator Tool
   -------------------------------------------------------------------------- */
function initOgpTool() {
    const ogTitle = document.getElementById('ogTitle');
    const ogDesc = document.getElementById('ogDesc');
    const ogUrl = document.getElementById('ogUrl');
    const ogImage = document.getElementById('ogImage');

    const ogTitleCount = document.getElementById('ogTitleCount');
    const ogDescCount = document.getElementById('ogDescCount');

    const prevGoogleUrl = document.getElementById('prevGoogleUrl');
    const prevGoogleTitle = document.getElementById('prevGoogleTitle');
    const prevGoogleDesc = document.getElementById('prevGoogleDesc');

    const prevTwitterDomain = document.getElementById('prevTwitterDomain');
    const prevTwitterTitle = document.getElementById('prevTwitterTitle');
    const prevTwitterDesc = document.getElementById('prevTwitterDesc');
    const prevTwitterImgBox = document.getElementById('prevTwitterImgBox');

    const ogpCodeResult = document.getElementById('ogpCodeResult');
    const copyOgpCodeBtn = document.getElementById('copyOgpCodeBtn');

    function updateOgpPreview() {
        const titleVal = ogTitle.value.trim() || 'ページタイトルがここに表示されます';
        const descVal = ogDesc.value.trim() || 'メタ説明文がここに表示されます。検索ユーザーにクリックされやすい魅力的で正確な文章を記述しましょう。';
        const urlVal = ogUrl.value.trim() || 'https://example.com';
        const imageVal = ogImage.value.trim();

        // Update Char Counts
        ogTitleCount.textContent = `${ogTitle.value.length} / 60文字 (推奨: 30〜40文字)`;
        ogDescCount.textContent = `${ogDesc.value.length} / 160文字 (推奨: 80〜120文字)`;

        // Google Preview
        prevGoogleTitle.textContent = titleVal;
        prevGoogleDesc.textContent = descVal;
        prevGoogleUrl.textContent = urlVal;

        // Twitter Preview
        prevTwitterTitle.textContent = titleVal;
        prevTwitterDesc.textContent = descVal;
        
        try {
            const domain = new URL(urlVal).hostname;
            prevTwitterDomain.textContent = domain || 'example.com';
        } catch {
            prevTwitterDomain.textContent = 'example.com';
        }

        if (imageVal) {
            prevTwitterImgBox.style.backgroundImage = `url('${imageVal}')`;
            prevTwitterImgBox.innerHTML = '';
        } else {
            prevTwitterImgBox.style.backgroundImage = 'none';
            prevTwitterImgBox.innerHTML = '<span class="img-placeholder-text">OGP Image (1200 x 630)</span>';
        }

        // Generate Code Block
        const generatedHtml = `<!-- SEO Meta Tags -->
<title>${escapeHtml(titleVal)}</title>
<meta name="description" content="${escapeHtml(descVal)}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(urlVal)}">
<meta property="og:title" content="${escapeHtml(titleVal)}">
<meta property="og:description" content="${escapeHtml(descVal)}">
${imageVal ? `<meta property="og:image" content="${escapeHtml(imageVal)}">` : ''}

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${escapeHtml(urlVal)}">
<meta name="twitter:title" content="${escapeHtml(titleVal)}">
<meta name="twitter:description" content="${escapeHtml(descVal)}">
${imageVal ? `<meta name="twitter:image" content="${escapeHtml(imageVal)}">` : ''}`;

        ogpCodeResult.textContent = generatedHtml;
    }

    [ogTitle, ogDesc, ogUrl, ogImage].forEach(input => {
        input.addEventListener('input', updateOgpPreview);
    });

    copyOgpCodeBtn.addEventListener('click', () => {
        copyToClipboard(ogpCodeResult.textContent, copyOgpCodeBtn, 'コピー完了！');
    });

    updateOgpPreview();
}

/* --------------------------------------------------------------------------
   3. QR Code Generator Tool
   -------------------------------------------------------------------------- */
function initQrTool() {
    const qrInput = document.getElementById('qrInput');
    const qrSize = document.getElementById('qrSize');
    const qrColor = document.getElementById('qrColor');
    const qrBgColor = document.getElementById('qrBgColor');
    const qrImg = document.getElementById('qrImg');
    const qrPlaceholder = document.getElementById('qrPlaceholder');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    function generateQrCode() {
        const text = qrInput.value.trim();
        if (!text) {
            qrImg.style.display = 'none';
            qrPlaceholder.style.display = 'block';
            downloadQrBtn.disabled = true;
            return;
        }

        const size = qrSize.value;
        const color = qrColor.value.replace('#', '');
        const bgColor = qrBgColor.value.replace('#', '');

        // Use standard high-reliability QR code API with instant Canvas download rendering
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${color}&bgcolor=${bgColor}&format=png`;

        qrImg.src = apiUrl;
        qrImg.onload = () => {
            qrImg.style.display = 'block';
            qrPlaceholder.style.display = 'none';
            downloadQrBtn.disabled = false;
        };
    }

    [qrInput, qrSize, qrColor, qrBgColor].forEach(elem => {
        elem.addEventListener('input', generateQrCode);
    });

    downloadQrBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(qrImg.src);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `qrcode_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (e) {
            alert('ダウンロードに失敗しました。画像を右クリックして保存してください。');
        }
    });
}

/* --------------------------------------------------------------------------
   4. Text & JSON Formatter Suite Tool
   -------------------------------------------------------------------------- */
function initTextJsonTool() {
    const textCoreInput = document.getElementById('textCoreInput');
    const statCharCount = document.getElementById('statCharCount');
    const statCharNoSpace = document.getElementById('statCharNoSpace');
    const statLineCount = document.getElementById('statLineCount');
    const statByteCount = document.getElementById('statByteCount');
    const jsonStatusAlert = document.getElementById('jsonStatusAlert');

    function updateTextStats() {
        const text = textCoreInput.value;
        statCharCount.textContent = text.length;
        statCharNoSpace.textContent = text.replace(/\s/g, '').length;
        statLineCount.textContent = text ? text.split('\n').length : 0;
        
        // UTF-8 byte count calculation
        const byteCount = new Blob([text]).size;
        statByteCount.textContent = byteCount;
    }

    textCoreInput.addEventListener('input', updateTextStats);

    // JSON Formatting
    document.getElementById('btnFormatJson').addEventListener('click', () => {
        const text = textCoreInput.value.trim();
        if (!text) return;

        try {
            const parsed = JSON.parse(text);
            textCoreInput.value = JSON.stringify(parsed, null, 2);
            showJsonStatus('✨ 正しいJSON形式です。きれいに整列しました！', 'success');
            updateTextStats();
        } catch (err) {
            showJsonStatus(`❌ JSON構文エラー: ${err.message}`, 'error');
        }
    });

    // JSON Minify
    document.getElementById('btnMinifyJson').addEventListener('click', () => {
        const text = textCoreInput.value.trim();
        if (!text) return;

        try {
            const parsed = JSON.parse(text);
            textCoreInput.value = JSON.stringify(parsed);
            showJsonStatus('⚡ JSONを1行に圧縮しました！', 'success');
            updateTextStats();
        } catch (err) {
            showJsonStatus(`❌ JSON構文エラー: ${err.message}`, 'error');
        }
    });

    // Case Converters
    document.getElementById('btnUpper').addEventListener('click', () => {
        textCoreInput.value = textCoreInput.value.toUpperCase();
        updateTextStats();
    });

    document.getElementById('btnLower').addEventListener('click', () => {
        textCoreInput.value = textCoreInput.value.toLowerCase();
        updateTextStats();
    });

    document.getElementById('btnClearText').addEventListener('click', () => {
        textCoreInput.value = '';
        jsonStatusAlert.style.display = 'none';
        updateTextStats();
    });

    function showJsonStatus(msg, type) {
        jsonStatusAlert.textContent = msg;
        jsonStatusAlert.className = `alert-status ${type}`;
        jsonStatusAlert.style.display = 'block';
    }
}

/* --------------------------------------------------------------------------
   5. Crypto Secure Password Generator
   -------------------------------------------------------------------------- */
function initPasswordTool() {
    const passLength = document.getElementById('passLength');
    const passLengthVal = document.getElementById('passLengthVal');
    const chkUpper = document.getElementById('chkUpper');
    const chkLower = document.getElementById('chkLower');
    const chkNum = document.getElementById('chkNum');
    const chkSym = document.getElementById('chkSym');
    const btnGenPass = document.getElementById('btnGenPass');
    const passResult = document.getElementById('passResult');
    const btnCopyPass = document.getElementById('btnCopyPass');
    const strengthFill = document.getElementById('strengthFill');
    const strengthLabel = document.getElementById('strengthLabel');

    passLength.addEventListener('input', () => {
        passLengthVal.textContent = passLength.value;
    });

    function generatePassword() {
        const length = parseInt(passLength.value);
        let chars = '';
        if (chkUpper.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chkLower.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (chkNum.checked) chars += '0123456789';
        if (chkSym.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!chars) {
            alert('少なくとも1つの文字種を選択してください。');
            return;
        }

        let password = '';
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            password += chars[randomValues[i] % chars.length];
        }

        passResult.value = password;
        updateStrength(password, length);
    }

    function updateStrength(pass, length) {
        let score = 0;
        if (length >= 12) score += 40;
        else score += length * 3;

        if (/[A-Z]/.test(pass)) score += 15;
        if (/[a-z]/.test(pass)) score += 15;
        if (/[0-9]/.test(pass)) score += 15;
        if (/[^A-Za-z0-9]/.test(pass)) score += 15;

        score = Math.min(100, score);
        strengthFill.style.width = `${score}%`;

        if (score >= 80) {
            strengthFill.style.backgroundColor = 'var(--success)';
            strengthLabel.textContent = '強度: 非常に行固（最適）';
        } else if (score >= 50) {
            strengthFill.style.backgroundColor = 'var(--warning)';
            strengthLabel.textContent = '強度: 普通（標準的）';
        } else {
            strengthFill.style.backgroundColor = 'var(--danger)';
            strengthLabel.textContent = '強度: 脆弱（変更を推奨）';
        }
    }

    btnGenPass.addEventListener('click', generatePassword);
    btnCopyPass.addEventListener('click', () => {
        if (passResult.value) {
            copyToClipboard(passResult.value, btnCopyPass, 'コピー！');
        }
    });

    generatePassword();
}

/* --------------------------------------------------------------------------
   6. Support Modal & Utility Functions
   -------------------------------------------------------------------------- */
function initSupportModal() {
    const modal = document.getElementById('supportModal');
    const openBtn = document.getElementById('supportModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function initAdToggle() {
    const toggleBtn = document.getElementById('toggleAdPreviewBtn');
    let highlighted = false;

    toggleBtn.addEventListener('click', () => {
        const adSlots = document.querySelectorAll('.ad-slot');
        highlighted = !highlighted;

        adSlots.forEach(slot => {
            if (highlighted) {
                slot.style.borderColor = 'var(--accent-pink)';
                slot.style.boxShadow = '0 0 16px rgba(236, 72, 153, 0.4)';
            } else {
                slot.style.borderColor = '';
                slot.style.boxShadow = '';
            }
        });
    });
}

function copyToClipboard(text, btnElement, successText = 'コピー完了') {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.textContent;
        btnElement.textContent = successText;
        btnElement.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
            btnElement.textContent = originalText;
            btnElement.style.backgroundColor = '';
        }, 2000);
    }).catch(() => {
        alert('コピーに失敗しました。');
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => {
        const escapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapes[match];
    });
}
