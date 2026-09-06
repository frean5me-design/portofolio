document.addEventListener('DOMContentLoaded', () => {
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function startBackgroundMusic() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.35; // 35% volume requested
        masterGain.connect(audioCtx.destination);

        const notes = [261.63, 329.63, 392.00, 523.25];
        let index = 0;

        setInterval(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.value = notes[index % notes.length];
            index++;

            gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start();
            osc.stop(audioCtx.currentTime + 4);
        }, 4000);
    }

    window.addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }, { once: true });

    setTimeout(startBackgroundMusic, 1000);

    function playClickSound() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    function playWhooshSound() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const bufferSize = audioCtx.sampleRate * 0.12;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.06);
        filter.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.12);
        filter.Q.value = 3;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.06);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        noise.start();
        noise.stop(audioCtx.currentTime + 0.12);
    }

    const interactiveSelectors = 'a, button, [role="button"], input, .group, .filter-btn';
    
    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest(interactiveSelectors);
        if (target && !target.dataset.hovered) {
            target.dataset.hovered = 'true';
            playWhooshSound();
            target.addEventListener('mouseleave', () => {
                delete target.dataset.hovered;
            }, { once: true });
        }
    });

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest(interactiveSelectors);
        if (target) {
            playClickSound();
        }
    });

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-panel');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('glass-panel');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    const reveals = document.querySelectorAll('.reveal');
    
    function reveal() {
        var windowHeight = window.innerHeight;
        var elementVisible = 150;
        
        reveals.forEach(element => {
            var elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
        
        const skillsSection = document.getElementById('skills');
        if(skillsSection) {
            const skillsTop = skillsSection.getBoundingClientRect().top;
            if(skillsTop < windowHeight - 100) {
                const skillBars = document.querySelectorAll('.skill-bar-fill');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
        }
    }
    
    window.addEventListener('scroll', reveal);
    reveal();

    const modalEl = document.getElementById('action-modal');
    const modalContent = document.getElementById('action-modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIconContainer = document.getElementById('modal-icon-container');
    const modalIcon = document.getElementById('modal-icon');
    const modalInput = document.getElementById('modal-input');
    const btnCancel = document.getElementById('modal-btn-cancel');
    const btnConfirm = document.getElementById('modal-btn-confirm');
    
    let modalResolve = null;

    function showModal({ type, title, message, inputValue, confirmText }) {
        return new Promise((resolve) => {
            modalResolve = resolve;
            
            modalInput.classList.add('hidden');
            modalInput.value = '';
            modalMessage.classList.remove('hidden');
            
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            btnConfirm.textContent = confirmText || 'Konfirmasi';

            if (type === 'delete') {
                modalIconContainer.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-500';
                modalIcon.className = 'fas fa-exclamation-triangle';
                btnConfirm.className = 'px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-md';
            } else if (type === 'edit') {
                modalIconContainer.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-500';
                modalIcon.className = 'fas fa-pen';
                btnConfirm.className = 'px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors shadow-md';
                modalInput.classList.remove('hidden');
                modalInput.value = inputValue || '';
            }

            modalEl.classList.remove('hidden');
            modalEl.classList.add('flex');
            setTimeout(() => {
                modalEl.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
            }, 10);

            if (type === 'edit') modalInput.focus();
        });
    }

    function closeModal() {
        modalEl.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modalEl.classList.add('hidden');
            modalEl.classList.remove('flex');
        }, 300);
    }

    btnCancel.addEventListener('click', () => {
        closeModal();
        if (modalResolve) modalResolve(false);
    });

    btnConfirm.addEventListener('click', () => {
        closeModal();
        if (modalResolve) {
            if (!modalInput.classList.contains('hidden')) {
                modalResolve(modalInput.value.trim());
            } else {
                modalResolve(true);
            }
        }
    });

    modalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnConfirm.click();
    });

    const adminModeToggle = document.getElementById('admin-mode-toggle');
    const adminControls = document.getElementById('admin-controls');
    const filterContainer = document.getElementById('filter-container');
    let isAdmin = false;

    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    function bindAdminActions(btnElement) {
        const editBtn = btnElement.querySelector('.edit-category-btn');
        const deleteBtn = btnElement.querySelector('.delete-category-btn');
        const textSpan = btnElement.querySelector('.filter-text');

        if (editBtn) {
            editBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const currentName = textSpan.textContent;
                
                const newName = await showModal({
                    type: 'edit',
                    title: 'Edit Kategori',
                    message: 'Ubah nama kategori portofolio:',
                    inputValue: currentName,
                    confirmText: 'Simpan Perubahan'
                });

                if (newName && newName !== currentName && newName !== false) {
                    textSpan.textContent = newName;
                    btnElement.setAttribute('data-filter', slugify(newName));
                }
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const categoryName = textSpan.textContent;
                
                const confirmed = await showModal({
                    type: 'delete',
                    title: 'Hapus Kategori',
                    message: `Anda yakin ingin menghapus kategori "${categoryName}"? Aksi ini akan menghilangkan filter ini dari halaman.`,
                    confirmText: 'Ya, Hapus'
                });

                if (confirmed === true) {
                    btnElement.style.transform = 'scale(0.9)';
                    btnElement.style.opacity = '0';
                    setTimeout(() => {
                        btnElement.remove();
                        if(btnElement.classList.contains('active')) {
                            document.querySelector('.filter-btn[data-filter="all"]').click();
                        }
                    }, 300);
                }
            });
        }
    }

    document.querySelectorAll('.filter-btn.editable').forEach(bindAdminActions);

    adminModeToggle.addEventListener('click', () => {
        isAdmin = !isAdmin;
        const icon = adminModeToggle.querySelector('i');
        const text = adminModeToggle.querySelector('span');

        if (isAdmin) {
            adminControls.classList.remove('hidden');
            adminControls.classList.add('flex');
            filterContainer.classList.add('admin-mode-active');
            icon.classList.remove('fa-lock');
            icon.classList.add('fa-unlock', 'text-green-500');
            text.textContent = 'Mode Admin Aktif';
            adminModeToggle.classList.add('border-green-200', 'bg-green-50');
        } else {
            adminControls.classList.add('hidden');
            adminControls.classList.remove('flex');
            filterContainer.classList.remove('admin-mode-active');
            icon.classList.remove('fa-unlock', 'text-green-500');
            icon.classList.add('fa-lock');
            text.textContent = 'Login Admin';
            adminModeToggle.classList.remove('border-green-200', 'bg-green-50');
        }
    });

    const addCategoryBtn = document.getElementById('add-category-btn');
    const newCategoryInput = document.getElementById('new-category-input');
    
    addCategoryBtn.addEventListener('click', () => {
        const categoryName = newCategoryInput.value.trim();
        
        if (categoryName) {
            const filterValue = slugify(categoryName);
            
            const newBtn = document.createElement('button');
            newBtn.className = 'filter-btn editable px-6 py-2 rounded-full bg-white/80 text-gray-600 hover:bg-gray-50 text-sm font-medium border border-gray-200 transition-all backdrop-blur-md animate-fade-in-up relative overflow-hidden group';
            newBtn.setAttribute('data-filter', filterValue);
            
            newBtn.innerHTML = `
                <span class="filter-text">${categoryName}</span>
                <div class="admin-actions-container absolute right-1 top-1/2 flex gap-1 bg-gray-100/80 backdrop-blur-md p-1 rounded-full shadow-sm border border-gray-200/50 z-20">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blue-100 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors edit-category-btn"><i class="fas fa-pen text-[10px]"></i></div>
                    <div class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100 text-gray-400 hover:text-red-500 cursor-pointer transition-colors delete-category-btn"><i class="fas fa-trash text-[10px]"></i></div>
                </div>
            `;
            
            newBtn.addEventListener('click', function(e) {
                if (e.target.closest('.admin-actions-container')) return;
                
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20', 'active');
                    btn.classList.add('bg-white/80', 'text-gray-600', 'hover:bg-gray-50');
                });
                this.classList.remove('bg-white/80', 'text-gray-600', 'hover:bg-gray-50');
                this.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20', 'active');
            });
            
            bindAdminActions(newBtn);
            filterContainer.appendChild(newBtn);
            newCategoryInput.value = '';
            
            const originalBtnContent = addCategoryBtn.innerHTML;
            addCategoryBtn.innerHTML = '<i class="fas fa-check"></i> Sukses';
            addCategoryBtn.classList.replace('bg-secondary', 'bg-green-500');
            
            setTimeout(() => {
                addCategoryBtn.innerHTML = originalBtnContent;
                addCategoryBtn.classList.replace('bg-green-500', 'bg-secondary');
            }, 1500);
        }
    });

    newCategoryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCategoryBtn.click();
        }
    });

    const aiSuggestBtn = document.getElementById('ai-suggest-btn');
    const aiSuggestionsContainer = document.getElementById('ai-suggestions-container');

    aiSuggestBtn.addEventListener('click', async () => {
        const originalHTML = aiSuggestBtn.innerHTML;
        aiSuggestBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        aiSuggestBtn.disabled = true;
        aiSuggestBtn.classList.add('opacity-75', 'cursor-not-allowed');
        
        aiSuggestionsContainer.classList.remove('hidden');
        aiSuggestionsContainer.innerHTML = '<div class="w-full flex items-center gap-2 text-xs text-purple-600"><i class="fas fa-robot animate-bounce"></i> Gemini sedang berpikir...</div>';

        try {
            const prompt = "Berikan 3 ide kategori portofolio pendek (1-2 kata) untuk seorang Arsitek, Drafter, dan Desain Grafis. Kategori saat ini: Interior, Eksterior, Desain Grafis. Berikan saran yang BERBEDA dan SPESIFIK (contoh: Masterplan, Denah, Animasi 3D, Mockup).";
            
            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                    }
                }
            };

            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                const suggestions = JSON.parse(jsonText);
                
                aiSuggestionsContainer.innerHTML = '';
                
                if (suggestions && suggestions.length > 0) {
                    const label = document.createElement('span');
                    label.className = 'text-[11px] text-purple-700 font-semibold self-center mr-1 tracking-wider uppercase';
                    label.innerHTML = '<i class="fas fa-sparkles text-amber-400"></i> Saran:';
                    aiSuggestionsContainer.appendChild(label);

                    suggestions.forEach(sug => {
                        const chip = document.createElement('button');
                        chip.className = 'px-3 py-1.5 rounded-lg bg-white text-purple-700 text-xs font-medium hover:bg-purple-50 hover:text-purple-900 transition-all border border-purple-200 shadow-sm hover:shadow active:scale-95';
                        chip.textContent = sug;
                        chip.onclick = () => {
                            newCategoryInput.value = sug;
                            newCategoryInput.focus();
                            newCategoryInput.classList.add('ring-2', 'ring-purple-400', 'border-purple-400');
                            setTimeout(() => {
                                newCategoryInput.classList.remove('ring-2', 'ring-purple-400', 'border-purple-400');
                            }, 800);
                        };
                        aiSuggestionsContainer.appendChild(chip);
                    });
                }
            } else {
                throw new Error("No candidates found in Gemini response.");
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            aiSuggestionsContainer.innerHTML = '<span class="text-xs text-red-500 flex items-center gap-1"><i class="fas fa-exclamation-circle"></i> Gagal terhubung ke AI. Coba lagi.</span>';
        } finally {
            aiSuggestBtn.innerHTML = originalHTML;
            aiSuggestBtn.disabled = false;
            aiSuggestBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    });

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (e.target.closest('.admin-actions-container')) return;

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20', 'active');
                btn.classList.add('bg-white/80', 'text-gray-600', 'hover:bg-gray-50');
            });
            this.classList.remove('bg-white/80', 'text-gray-600', 'hover:bg-gray-50');
            this.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20', 'active');
        });
    });

    const aiChatToggle = document.getElementById('ai-chat-toggle');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const aiChatClose = document.getElementById('ai-chat-close');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');

    let chatHistory = [];
    
    const systemPrompt = `Kamu adalah asisten AI virtual yang ramah dan profesional untuk portofolio Rizky Ananda. 
    Berikut adalah profil Rizky: 
    - Lahir: 26 Okt 1994, tinggal di Kab. Balangan, Kalimantan Selatan. 
    - Pengalaman Kerja: Sejak 2012. Pernah bekerja di CV. Deya Consultant Engineering (Drafter), CV. Ahmad Bersaudara Engineering (Inspektur), PT. Nusantara Abadi Jaya (Admin), PT. Goautama Sinar Batuah (Drafter), CV. Ar-Rahmah (Inspektur), dan CV. Star Light Work (Desain Grafis).
    - Keahlian: Corel Draw (90%), Photoshop (80%), Canva (90%), Autocad (90%), Sketchup (90%), Revit (50%), Ms Office (90%). 
    - Kontak: Telepon 0813-4755-3163, Email Rizky.arch24@gmail.com, Link: lynk.id/Lnarchstudio.
    Tugasmu: Jawab pertanyaan pengunjung website seputar profil, keahlian, dan pengalaman Rizky dengan bahasa Indonesia yang sopan, meyakinkan, dan singkat (maksimal 2-3 kalimat). JANGAN mengarang informasi di luar data yang diberikan. Jika ada pertanyaan di luar konteks portofolio, arahkan pengguna untuk menghubungi Rizky langsung.`;

    aiChatToggle.addEventListener('click', () => {
        const isHidden = aiChatWindow.classList.contains('hidden');
        if (isHidden) {
            aiChatWindow.classList.remove('hidden');
            aiChatWindow.classList.add('flex');
            aiChatInput.focus();
        } else {
            aiChatWindow.classList.add('hidden');
            aiChatWindow.classList.remove('flex');
        }
    });

    aiChatClose.addEventListener('click', () => {
        aiChatWindow.classList.add('hidden');
        aiChatWindow.classList.remove('flex');
    });

    function appendMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser 
            ? 'bg-primary text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] shadow-sm text-xs leading-relaxed'
            : 'bg-purple-100 text-purple-900 p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] shadow-sm text-xs leading-relaxed border border-purple-200/50';
        
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgDiv.innerHTML = formattedText;
        
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    async function handleAiChatSend() {
        const text = aiChatInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        aiChatInput.value = '';
        aiChatInput.disabled = true;
        aiChatSend.disabled = true;
        aiChatSend.innerHTML = '<i class="fas fa-circle-notch fa-spin text-xs"></i>';

        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'bg-purple-100/50 text-purple-700 p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-xs flex items-center gap-2';
        loadingDiv.innerHTML = '<i class="fas fa-ellipsis-h animate-pulse"></i> Gemini sedang mengetik...';
        aiChatMessages.appendChild(loadingDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

        chatHistory.push({ role: "user", parts: [{ text: text }] });

        try {
            const payload = {
                contents: chatHistory,
                systemInstruction: { parts: [{ text: systemPrompt }] }
            };

            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            document.getElementById(loadingId).remove();

            if (result.candidates && result.candidates.length > 0) {
                const replyText = result.candidates[0].content.parts[0].text;
                appendMessage(replyText, false);
                chatHistory.push({ role: "model", parts: [{ text: replyText }] });
            } else {
                throw new Error("No valid response from Gemini");
            }
        } catch (error) {
            console.error("AI Chat Error:", error);
            document.getElementById(loadingId)?.remove();
            appendMessage("Maaf, jaringan sedang sibuk. Silakan coba beberapa saat lagi. 🙏", false);
            chatHistory.pop();
        } finally {
            aiChatInput.disabled = false;
            aiChatSend.disabled = false;
            aiChatSend.innerHTML = '<i class="fas fa-paper-plane text-xs"></i>';
            aiChatInput.focus();
        }
    }

    aiChatSend.addEventListener('click', handleAiChatSend);
    aiChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAiChatSend();
    });

    const socialToggleBtn = document.getElementById('social-toggle-btn');
    const socialPopupItems = document.getElementById('social-popup-items');
    const socialToggleIcon = document.getElementById('social-toggle-icon');
    let isSocialOpen = false;

    socialToggleBtn.addEventListener('click', () => {
        isSocialOpen = !isSocialOpen;
        if (isSocialOpen) {
            socialPopupItems.classList.remove('opacity-0', 'pointer-events-none', 'scale-95', 'translate-y-2');
            socialPopupItems.classList.add('opacity-100', 'pointer-events-auto', 'scale-100', 'translate-y-0');
            socialToggleIcon.classList.remove('fa-comment-dots');
            socialToggleIcon.classList.add('fa-times');
        } else {
            socialPopupItems.classList.add('opacity-0', 'pointer-events-none', 'scale-95', 'translate-y-2');
            socialPopupItems.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100', 'translate-y-0');
            socialToggleIcon.classList.remove('fa-times');
            socialToggleIcon.classList.add('fa-comment-dots');
        }
    });

    document.addEventListener('click', (e) => {
        const socialMenu = document.getElementById('floating-social-menu');
        if (isSocialOpen && !socialMenu.contains(e.target)) {
            socialToggleBtn.click();
        }
    });
});

function copyEmail() {
    const email = "Rizky.arch24@gmail.com";
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    
    try {
        document.execCommand('copy');
        const btn = event.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check text-green-500"></i> Tersalin!';
        btn.classList.add('border-green-500', 'text-green-600');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('border-green-500', 'text-green-600');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy email', err);
    }
    
    document.body.removeChild(el);
}