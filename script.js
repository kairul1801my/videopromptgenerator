document.addEventListener('DOMContentLoaded', () => {
    // Elemen UI Bahasa Melayu
    const promptDisplayMs = document.getElementById('promptDisplayMs');
    const generateButtonMs = document.getElementById('generateButtonMs');
    const copyButtonMs = document.getElementById('copyButtonMs');
    const saveButtonMs = document.getElementById('saveButtonMs');
    const exportButtonMs = document.getElementById('exportButtonMs');
    const copyFeedbackMs = document.getElementById('copyFeedbackMs');

    // Elemen UI Bahasa Inggeris
    const promptDisplayEn = document.getElementById('promptDisplayEn');
    const copyButtonEn = document.getElementById('copyButtonEn');
    const saveButtonEn = document.getElementById('saveButtonEn');
    const exportButtonEn = document.getElementById('exportButtonEn');
    const copyFeedbackEn = document.getElementById('copyFeedbackEn');

    // Elemen UI Umum
    const clearInputsButton = document.getElementById('clearInputsButton');
    const savedPromptsList = document.getElementById('savedPromptsList');
    const clearSavedButton = document.getElementById('clearSavedButton');
    const helpButton = document.getElementById('helpButton');
    const helpModal = document.getElementById('helpModal');
    const closeModalButton = document.querySelector('.close-button');

    // Semua medan input yang perlu kita kumpulkan
    const inputFields = {
        genre: document.getElementById('genreInput'),
        subject: document.getElementById('subjectInput'),
        subjectAction: document.getElementById('subjectActionInput'),
        subjectExpression: document.getElementById('subjectExpressionInput'),
        location: document.getElementById('locationInput'),
        time: document.getElementById('timeInput'),
        cameraAngle: document.getElementById('cameraAngleInput'),
        cameraMovement: document.getElementById('cameraMovementInput'),
        lighting: document.getElementById('lightingInput'),
        videoStyle: document.getElementById('videoStyleInput'),
        aspectRatio: document.getElementById('aspectRatioInput'),
        videoMood: document.getElementById('videoMoodInput'),
        backgroundSound: document.getElementById('backgroundSoundInput'),
        subjectDialogue: document.getElementById('subjectDialogueInput')
    };

    // --- Pangkalan Data Prompt Bahasa Melayu (digunakan untuk mengisi kekosongan) ---
    const defaultPromptsMs = {
        genre: [{ text: "Komedi Romantik" }, { text: "Drama Jenayah" }, { text: "Seram Psikologi" }, { text: "Sains Fiksyen Epik" }, { text: "Fantasi Pengembaraan" }, { text: "Dokumentari Hidupan Liar" }, { text: "Vlog Makanan & Perjalanan" }, { text: "Tutorial Kodifikasi" }, { text: "Animasi Muzikal" }, { text: "Thriller Politik" }, { text: "Aksi Kejar-Mengejar" }, { text: "Misteri Pembunuhan Klasik" }, { text: "Percintaan Sejarah" }, { text: "Drama Biografi" }, { text: "Fantasi Gelap Bandar" }, { text: "Sitkom Pejabat" }, { text: "Percubaan Sosial Mendalam" }, { text: "Ulasan Gajet Terkini" }, { text: "Permainan Video Stream" }, { text: "Resipi Masakan Chef" }, { text: "Rutin Kecergasan Harian" }, { text: "Filem Noir Moden" }, { text: "Cyberpunk Indie" }, { text: "Steampunk Komedi" }, { text: "Post-Apocalyptic Survival" }, { text: "Utopia Futuristik" }, { text: "Dystopia Sosial" }],
        subject: [{ text: "Lelaki Melayu Berpakaian Segak" }, { text: "Robot Peneman Usang" }, { text: "Pelajar Sains Komputer" }, { text: "Artis Jalanan Misteri" }, { text: "Makhluk Asing Comel Yang Tersesat" }, { text: "Detektif Persendirian Kuno" }, { text: "Kucing Tabby Dengan Kaca Mata" }, { text: "Keluarga Yang Menemui Portal" }, { text: "Pahlawan Kuno Yang Bangkit Semula" }, { text: "Ahli Sihir Moden Yang Ketagih Kopi" }, { text: "YouTuber Gagal" }, { text: "Wira Super Yang Tertekan Dengan Kerjanya" }, { text: "Jurutera AI Yang Mencipta Kesedaran" }, { text: "Pengembara Dimensi Yang Mengumpul Artifak" }, { text: "Pemberontak Siber Yang Mencuri Identiti" }, { text: "Arkitek Mimpi Yang Terperangkap" }, { text: "Kapten Kapal Angkasa Yang Hilang Krew" }, { text: "Wanita Tua Dengan Kuasa Telekinesis" }, { text: "Penyanyi Rock Terkenal Yang Mencari Inspirasi" }],
        subjectAction: [{ text: "Mempersembahkan Seni Silat" }, { text: "Mencuba menyelesaikan misteri purba" }, { text: "Melarikan diri dari musuh yang tidak kelihatan" }, { text: "Mencipta penemuan teknologi revolusioner" }, { text: "Mengembara ke galaksi yang tidak diketahui" }, { text: "Berhadapan dengan dilema moral yang sukar" }, { text: "Menyertai pertandingan memasak yang lucu" }, { text: "Mencari kebenaran yang tersembunyi dalam data" }, { text: "Mengajar AI cara menjadi manusia" }, { text: "Menghadapi trauma masa lalu dalam mimpi" }, { text: "Berpindah ke bandar yang terapung" }, { text: "Mencuba menghentikan rancangan jahat korporat" }, { text: "Memulakan perniagaan kedai buku siber" }, { text: "Menyelamatkan seseorang dari keruntuhan bangunan" }, { text: "Mengikuti petunjuk misteri di dunia maya" }, { text: "Melakukan eksperimen berisiko tinggi" }, { text: "Mencari jalan pulang ke realiti" }, { text: "Mengatur semula rangkaian neural" }, { text: "Beraksi di atas pentas hoverboard" }],
        subjectExpression: [{ text: "Tenang & Tersenyum tetapi riak muka nampak tegas" }, { text: "Terkejut dan keliru oleh realiti maya" }, { text: "Bersemangat dan penuh harapan untuk masa depan" }, { text: "Takut dan gelisah dalam kegelapan" }, { text: "Marah dan kecewa dengan sistem" }, { text: "Gembira dan teruja dengan penemuan" }, { text: "Sedih dan putus asa di dunia yang musnah" }, { text: "Tenang dan fokus menghadapi ancaman" }, { text: "Curiga dan berhati-hati dengan setiap bayang" }, { text: "Bercita-cita tinggi dan bertekad untuk berubah" }, { text: "Bingung tetapi ingin tahu tentang dimensi baru" }, { text: "Mengalami kekalahan yang pahit" }, { text: "Merasa terasing dari manusia lain" }, { text: "Dalam dilema besar" }],
        location: [{ text: "Gelanggang Silat Moden" }, { text: "Kafe futuristik di Tokyo pada tahun 2077" }, { text: "Stesen angkasa terbengkalai di orbit Marikh" }, { text: "Hutan hujan bioluminescent di planet asing" }, { text: "Makmal rahsia bawah tanah di gurun Nevada" }, { text: "Pekan kecil yang terpencil di tepi tasik beku" }, { text: "Pustaka lama yang berhabuk dan sunyi pada waktu malam" }, { text: "Dunia di dalam lukisan digital yang interaktif" }, { text: "Dimensi alternatif yang penuh anomali" }, { text: "Kapal selam di dasar lautan dalam yang belum diterokai" }, { text: "Ruang siber yang tak terbatas dengan bangunan data" }, { text: "Rumah agam purba yang misteri di puncak bukit" }, { text: "Koloni Marikh yang baru dibina" }, { text: "Kedai kopi hipster dengan portal masa tersembunyi" }, { text: "Panggung teater lama yang kosong dan dihantui" }, { text: "Perkampungan di atas pokok di hutan fantasi" }, { text: "Pusat membeli-belah yang ditinggalkan selepas kiamat" }],
        time: [{ text: "Malam" }, { text: "Masa depan jauh, tahun 2242" }, { text: "Zaman pertengahan alternatif dengan teknologi steam" }, { text: "Dalam masa sekarang, tengah malam" }, { text: "Subuh yang berkabus dan hening" }, { text: "Petang yang damai di tepi pantai yang diterangi matahari terbenam" }, { text: "Ketika hujan lebat dan ribut di bandar siber" }, { text: "Waktu siaga ketenteraan di sempadan angkasa" }, { text: "Era keemasan siber yang penuh kegembiraan" }, { text: "Kiamat digital yang berlaku secara perlahan" }, { text: "Di tengah-tengah karnival futuristik" }, { text: "Semasa gerhana matahari penuh" }],
        cameraAngle: [{ text: "Jarak Jauh" }, { text: "Sudut mata burung (Bird's Eye View)" }, { text: "Sudut rendah (Low Angle)" }, { text: "Sudut mata cacing (Worm's Eye View)" }, { text: "Pandangan orang pertama (POV)" }, { text: "Sudut Belanda/Serong (Dutch Angle)" }, { text: "Sudut rapat (Close-Up) pada ekspresi wajah" }, { text: "Sudut bahu (Over the Shoulder)" }, { text: "Sudut master (Master Shot)" }, { text: "Sudut tinggi (High Angle)" }],
        cameraMovement: [{ text: "Sudut Orbit" }, { text: "Pan (Bergerak mendatar) perlahan" }, { text: "Tilt (Bergerak menegak) dramatik" }, { text: "Dolly (Bergerak ke depan/belakang) yang intens" }, { text: "Crane (Bergerak menegak/melintang) yang megah" }, { text: "Handheld (Pegangan tangan) yang gelisah" }, { text: "Zoom masuk (Zoom In) yang tiba-tiba" }, { text: "Zoom keluar (Zoom Out) yang mendedahkan" }, { text: "Stabilized (Stabil) dan lancar" }, { text: "Drone shot yang mengasyikkan" }, { text: "Pergerakan gimbal yang sinematik" }, { text: "Track (Gerakan selari) di tepi jalan" }],
        lighting: [{ text: "Cahaya Yang Praktikal" }, { text: "Cahaya neon gelap dan moody dari papan tanda" }, { text: "Pencahayaan semula jadi yang lembut dan hangat" }, { text: "Cahaya keras dengan bayang-bayang tajam dari matahari" }, { text: "Backlight (Cahaya belakang) yang siluet" }, { text: "Cahaya rendah (Low-key) yang dramatik" }, { text: "Cahaya tinggi (High-key) yang cerah" }, { text: "Pencahayaan stroberi (Gaya disko)" }, { text: "Cahaya dari skrin komputer yang menerangi wajah" }, { text: "Lampu kelip-kelip di hutan ajaib" }, { text: "Pencahayaan dari lampu jalan yang bersinar" }, { text: "Cahaya ambien dari bandar malam" }],
        videoStyle: [{ text: "Gaya Dokumentari" }, { text: "Gaya Sinematik & Epik" }, { text: "Gaya Dokumentari (Found Footage)" }, { text: "Gaya Vlog Kasual & Bertenaga" }, { text: "Gaya Animasi 2D Klasik" }, { text: "Gaya Animasi 3D Realistik" }, { text: "Gaya Retro/Vintage (80-an)" }, { text: "Gaya Cyberpunk Estetik" }, { text: "Gaya Komik/Graphic Novel" }, { text: "Gaya Eksperimental/Abstrak" }, { text: "Gaya Stop-Motion Aneh" }, { text: "Gaya Hyperlapse (Time-lapse yang bergerak)" }, { text: "Gaya One-Shot (Satu Pengambilan Panjang)" }, { text: "Gaya Mockumentary (Dokumentari Palsu)" }],
        aspectRatio: [{ text: "21:9" }, { text: "16:9" }, { text: "4:3" }, { text: "1:1" }, { text: "9:16" }, { text: "2.35:1" }],
        videoMood: [{ text: "Suasana Tenang" }, { text: "Misterius dan tegang" }, { text: "Ceria dan bersemangat" }, { text: "Malapetaka dan menyedihkan" }, { text: "Mengharukan dan memotivasi" }, { text: "Aneh dan sureal" }, { text: "Epik dan mengagumkan" }, { text: "Menenangkan dan meditatif" }, { text: "Kacau dan panik" }, { text: "Romantik dan lembut" }, { text: "Brutal dan tanpa kompromi" }, { text: "Nostalgik dan sentimental" }, { text: "Mengerikan dan menjijikkan" }],
        backgroundSound: [{ text: "Muzik Epik" }, { text: "Muzik synthwave yang futuristik" }, { text: "Bunyi alam semula jadi yang menenangkan (burung, sungai)" }, { text: "Desiran angin yang sunyi di padang gurun" }, { text: "Bunyi bising bandar siber yang sibuk" }, { text: "Muzik orkestra yang epik dan membangkitkan semangat" }, { text: "Suara jangkrik di malam hari" }, { text: "Gelak tawa riuh rendah di majlis" }, { text: "Bunyi sistem komputer yang kompleks dan berdesir" }, { text: "Degupan jantung yang kuat dan cepat" }, { text: "Tiada bunyi, hanya visual yang menonjol" }, { text: "Bunyi air hujan di tingkap" }, { text: "Muzik latar belakang hip-hop yang santai" }, { text: "Bunyi bising statik radio" }],
        subjectDialogue: [{ text: "TAK AKAN MELAYU HILANG DI DUNIA" }, { text: "DAPATKAN EBUKU KERIS & KUANTUM: PAHLAWAN 5 - EPISOD 1. GEMPAK HABIS. TEKAN LINK DI BIO SEKARANG." }, { text: "Satu monolog penuh emosi tentang kehilangan" }, { text: "Pertukaran dialog yang pantas dan lucu" }, { text: "Penyampaian maklumat penting dengan nada bimbang" }, { text: "Slogan yang mudah diingati untuk produk" }, { text: "Narasi misteri dari suara tanpa badan" }, { text: "Soalan falsafah yang mendalam tentang kewujudan" }, { text: "Pengakuan yang jujur dan menyayat hati" }, { text: "Rintihan putus asa dalam kegelapan" }, { text: "Seruan kemenangan yang bergema" }, { text: "Bisikan rahsia yang tidak jelas" }, { text: "Arahan yang jelas dan tegas untuk misi" }, { text: "Puisi yang dibaca dengan lembut" }, { text: "Lirik lagu yang menyentuh jiwa" }]
    };

    // --- Pangkalan Data Prompt Bahasa Inggeris (BARU) ---
    // Pastikan ini sepadan dengan defaultPromptsMs
    const defaultPromptsEn = {
        genre: [{ text: "Romantic Comedy" }, { text: "Crime Drama" }, { text: "Psychological Horror" }, { text: "Epic Science Fiction" }, { text: "Fantasy Adventure" }, { text: "Wildlife Documentary" }, { text: "Coding Tutorial" }, { text: "Musical Animation" }, { text: "Political Thriller" }, { text: "High-Speed Chase Action" }, { text: "Classic Murder Mystery" }, { text: "Historical Romance" }, { text: "Biographical Drama" }, { text: "Urban Dark Fantasy" }, { text: "Office Sitcom" }, { text: "Deep Social Experiment" }, { text: "Latest Gadget Review" }, { text: "Video Game Stream" }, { text: "Chef's Recipe Cook-along" }, { text: "Daily Fitness Routine" }, { text: "Modern Film Noir" }, { text: "Indie Cyberpunk" }, { text: "Comedy Steampunk" }, { text: "Post-Apocalyptic Survival" }, { text: "Futuristic Utopia" }, { text: "Social Dystopia" }],
        subject: [{ text: "Well-Dressed Malay Man" }, { text: "Old Companion Robot" }, { text: "Group of Computer Science Students" }, { text: "Mysterious Street Artist" }, { text: "Cute Lost Alien" }, { text: "Grumpy Private Detective" }, { text: "Tabby Cat with Glasses" }, { text: "Family Discovering a Portal" }, { text: "Ancient Warrior Reawakened" }, { text: "Coffee-Addicted Modern Sorcerer" }, { text: "Failed YouTuber" }, { text: "Overworked Superhero" }, { text: "AI Engineer Creating Consciousness" }, { text: "Dimension Traveler Collecting Artifacts" }, { text: "Cyber Rebel Stealing Identities" }, { text: "Dream Architect Trapped in a Dream" }, { text: "Spaceship Captain Missing Crew" }, { text: "Old Woman with Telekinesis" }, { text: "Famous Rock Singer Seeking Inspiration" }],
        subjectAction: [{ text: "Performing Silat Martial Arts" }, { text: "Trying to solve an ancient mystery" }, { text: "Escaping from an invisible enemy" }, { text: "Creating a revolutionary tech discovery" }, { text: "Journeying into unknown galaxies" }, { text: "Confronting a difficult moral dilemma" }, { text: "Participating in a funny cooking competition" }, { text: "Searching for hidden truth in data" }, { text: "Teaching an AI how to be human" }, { text: "Facing past trauma in a dream" }, { text: "Moving to a floating city" }, { text: "Trying to stop a corporate evil plan" }, { text: "Starting a cyber bookstore business" }, { text: "Rescuing someone from a collapsing building" }, { text: "Following mysterious clues in a virtual world" }, { text: "Conducting a high-risk experiment" }, { text: "Finding their way back to reality" }, { text: "Re-configuring a neural network" }, { text: "Performing on a hoverboard stage" }],
        subjectExpression: [{ text: "Calm & Smiling but with a determined look" }, { text: "Shocked and confused by virtual reality" }, { text: "Excited and hopeful for the future" }, { text: "Scared and anxious in the dark" }, { text: "Angry and frustrated with the system" }, { text: "Joyful and thrilled by a discovery" }, { text: "Calm and focused facing a threat" }, { text: "Suspicious and cautious of every shadow" }, { text: "Ambitious and determined to change" }, { text: "Confused but curious about a new dimension" }, { text: "Suffering a bitter defeat" }, { text: "Feeling isolated from other humans" }, { text: "In a great dilemma" }],
        location: [{ text: "Modern Silat Training Ground" }, { text: "Futuristic cafe in Tokyo in 2077" }, { text: "Abandoned space station in Mars orbit" }, { text: "Bioluminescent rainforest on an alien planet" }, { text: "Secret underground lab in Nevada desert" }, { text: "Remote small town by a frozen lake" }, { text: "Old dusty and quiet library at night" }, { text: "World inside an interactive digital painting" }, { text: "Strange alternate dimension full of anomalies" }, { text: "Submarine at the bottom of an unexplored deep ocean" }, { text: "Infinite cyber space with data buildings" }, { text: "Mysterious ancient mansion on a hilltop" }, { text: "Newly built Mars colony" }, { text: "Hipster coffee shop with a hidden time portal" }, { text: "Empty and haunted old theater stage" }, { text: "Treehouse village in a fantasy forest" }, { text: "Abandoned shopping mall after an apocalypse" }],
        time: [{ text: "Night" }, { text: "Far future, year 2242" }, { text: "Alternate medieval era with steam technology" }, { text: "In the present time, midnight" }, { text: "Misty and quiet dawn" }, { text: "Peaceful evening by a sunset-lit beach" }, { text: "During heavy rain and storm in a cyber city" }, { text: "Military alert time at a space border" }, { text: "Golden age of cybernetics full of joy" }, { text: "Slowly unfolding digital apocalypse" }, { text: "In the middle of a futuristic carnival" }, { text: "During a total solar eclipse" }],
        cameraAngle: [{ text: "Long Shot" }, { text: "Bird's Eye View Wide Shot" }, { text: "Low Angle Shot highlighting the subject" }, { text: "Worm's Eye View Funny Shot" }, { text: "First-Person Point of View (POV) Deep Shot" }, { text: "Dutch Angle Confusing Shot" }, { text: "Close-Up Shot on intense facial expression" }, { text: "Over the Shoulder Intimate Shot" }, { text: "Master Shot showing the entire scene" }, { text: "High Angle Shot showing subject's vulnerability" }],
        cameraMovement: [{ text: "Orbit Shot" }, { text: "Slow Pan across landscape" }, { text: "Dramatic Tilt from bottom to top" }, { text: "Intense Dolly following the subject" }, { text: "Magnificent Crane Shot over buildings" }, { text: "Shaky and Realistic Handheld Shot" }, { text: "Sudden Zoom In on an object" }, { text: "Revealing Zoom Out of surroundings" }, { text: "Stabilized and Smooth Movement" }, { text: "Captivating Drone Shot over city" }, { text: "Cinematic Gimbal Movement" }, { text: "Parallel Track Shot along a street" }],
        lighting: [{ text: "Practical Light" }, { text: "Dark and Moody Neon Lights from signs" }, { text: "Soft and Warm Natural Lighting" }, { text: "Harsh Light with Sharp Shadows from sun" }, { text: "Silhouetting Backlight" }, { text: "Dramatic and Mysterious Low-key Lighting" }, { text: "Bright and Cheerful High-key Lighting" }, { text: "Strobe Lighting (Disco Style) Flickering" }, { text: "Computer Screen Light Illuminating Face" }, { text: "Fairy Lights in a magical forest" }, { text: "Streetlight Glow" }, { text: "Ambient City Night Light" }],
        videoStyle: [{ text: "Documentary Style" }, { text: "Cinematic & Epic Style" }, { text: "Found Footage Documentary" }, { text: "Casual & Energetic Vlog Style" }, { text: "Classic 2D Animation Style" }, { text: "Realistic 3D Animation Style" }, { text: "Retro/Vintage Style (80s)" }, { text: "Cyberpunk Aesthetic Style" }, { text: "Comic/Graphic Novel Style" }, { text: "Experimental/Abstract Style" }, { text: "Weird Stop-Motion Style" }, { text: "Hyperlapse (Moving Time-lapse) Style" }, { text: "One-Shot (Long Take) Style" }, { text: "Mockumentary (Fake Documentary) Style" }],
        aspectRatio: [{ text: "21:9" }, { text: "16:9" }, { text: "4:3" }, { text: "1:1" }, { text: "9:16" }, { text: "2.35:1" }],
        videoMood: [{ text: "Calm Atmosphere" }, { text: "Mysterious and tense" }, { text: "Cheerful and energetic" }, { text: "Catastrophic and saddening" }, { text: "Heartwarming and motivating" }, { text: "Weird and surreal" }, { text: "Epic and awe-inspiring" }, { text: "Soothing and meditative" }, { text: "Chaotic and panicked" }, { text: "Romantic and tender" }, { text: "Brutal and uncompromising" }, { text: "Nostalgic and sentimental" }, { text: "Horrifying and disgusting" }],
        backgroundSound: [{ text: "Epic Music" }, { text: "Futuristic synthwave music" }, { text: "Calming nature sounds (birds, river)" }, { text: "Silent wind rustling in the desert" }, { text: "Busy cyber city background noise" }, { text: "Epic and inspiring orchestral music" }, { text: "Cricket chirps at night" }, { text: "Lively laughter at a party" }, { text: "Complex computer system humming" }, { text: "Loud and fast heartbeat" }, { text: "No sound, only visual emphasis" }, { text: "Rain hitting window sound" }, { text: "Relaxing hip-hop background music" }, { text: "Static radio noise" }],
        subjectDialogue: [{ text: "NO MALAY SHALL PERISH FROM THIS WORLD" }, { text: "GET THE EBOOK KERIS & QUANTUM: WARRIOR 5 - EPISODE 1. TOTALLY AWESOME. CLICK THE LINK IN BIO NOW." }, { text: "An emotional monologue about loss" }, { text: "Fast-paced and funny dialogue exchange" }, { text: "Urgent delivery of important information" }, { text: "Catchy slogan for a product" }, { text: "Mysterious narration from a disembodied voice" }, { text: "Deep philosophical question about existence" }, { text: "Heartfelt and honest confession" }, { text: "Desperate cry in the dark" }, { text: "Triumphant shout echoing" }, { text: "Unclear secret whisper" }, { text: "Clear and firm instructions for a mission" }, { text: "Poetry read softly" }, { text: "Soul-touching song lyrics" }]
    };

    let currentPromptTextMs = ""; // Untuk prompt Bahasa Melayu
    let currentPromptTextEn = ""; // Untuk prompt Bahasa Inggeris

    // Fungsi pembantu untuk mendapatkan elemen rawak dari array
    function getRandomElement(arr) {
        if (arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Fungsi untuk menjana prompt dalam satu bahasa tertentu
    function generateSingleLanguagePrompt(lang) {
        const promptsData = (lang === 'ms') ? defaultPromptsMs : defaultPromptsEn; // PENTING: Pembetulan ini!
        const parts = [];

        const categoryOrder = [
            'genre', 'subject', 'subjectAction', 'subjectExpression', 'location',
            'time', 'cameraAngle', 'cameraMovement', 'lighting', 'videoStyle',
            'aspectRatio', 'videoMood', 'backgroundSound', 'subjectDialogue'
        ];

        for (const category of categoryOrder) {
            const inputElement = inputFields[category];
            let value = inputElement.value.trim();
            
            // If user input is empty, get a random default prompt from the specified language
            if (value === "") {
                const randomItem = getRandomElement(promptsData[category]);
                if (randomItem) {
                    value = randomItem.text;
                } else {
                    value = ""; // No default value if nothing found
                }
            }

            if (value) {
                // AI-friendly output format (ultra concise)
                if (category === 'subjectDialogue') {
                    parts.push(`"${value}"`); // Just the dialogue in quotes
                } else if (category === 'aspectRatio') {
                    parts.push(`aspect ratio ${value}`);
                } else if (category === 'time') {
                    parts.push(`time ${value}`);
                } else {
                    parts.push(value); // Raw value for other categories
                }
            }
        }

        let generatedText = parts.join(" ").trim();
        generatedText = generatedText.replace(/\s{2,}/g, ' ').trim(); // Remove any potential double spaces
        if (generatedText.length > 0 && !generatedText.endsWith('.')) {
            generatedText += '.';
        }
        return generatedText;
    }

    // Fungsi utama untuk menjana kedua-dua prompt (Melayu & Inggeris)
    function generateBothPrompts() {
        currentPromptTextMs = generateSingleLanguagePrompt('ms');
        currentPromptTextEn = generateSingleLanguagePrompt('en');

        promptDisplayMs.innerHTML = currentPromptTextMs || "<span class='neon-text'>Sila masukkan idea anda atau jana untuk inspirasi!</span>";
        promptDisplayEn.innerHTML = currentPromptTextEn || "<span class='neon-text'>Please enter your ideas or generate for inspiration!</span>";
        
        // Perbaharui status butang selepas prompt dijana
        updateButtonStates(); 
    }

    function updateButtonStates() {
        // State untuk butang BM
        const hasPromptMs = currentPromptTextMs !== "" && !promptDisplayMs.innerHTML.includes("Sila masukkan idea anda");
        copyButtonMs.disabled = !hasPromptMs;
        saveButtonMs.disabled = !hasPromptMs;
        exportButtonMs.disabled = !hasPromptMs;
        copyButtonMs.classList.toggle('disabled', !hasPromptMs);
        saveButtonMs.classList.toggle('disabled', !hasPromptMs);
        exportButtonMs.classList.toggle('disabled', !hasPromptMs);

        // State untuk butang BI
        const hasPromptEn = currentPromptTextEn !== "" && !promptDisplayEn.innerHTML.includes("Please enter your ideas");
        copyButtonEn.disabled = !hasPromptEn;
        saveButtonEn.disabled = !hasPromptEn;
        exportButtonEn.disabled = !hasPromptEn;
        copyButtonEn.classList.toggle('disabled', !hasPromptEn);
        saveButtonEn.classList.toggle('disabled', !hasPromptEn);
        exportButtonEn.classList.toggle('disabled', !hasPromptEn);
    }

    // --- Ciri "Salin Prompt" ---
    function setupCopyButton(buttonElement, feedbackElement, displayElement) { // Terima displayElement
        buttonElement.addEventListener('click', () => {
            const textToCopy = displayElement.innerText; // Ambil teks dari displayElement
            if (textToCopy && textToCopy !== "Sila masukkan idea anda atau jana untuk inspirasi!" && textToCopy !== "Please enter your ideas or generate for inspiration!") {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    feedbackElement.classList.add('show');
                    setTimeout(() => {
                        feedbackElement.classList.remove('show');
                    }, 1500);
                }).catch(err => {
                    console.error('Gagal menyalin: ', err);
                    alert('Gagal menyalin skrip.');
                });
            }
        });
    }

    setupCopyButton(copyButtonMs, copyFeedbackMs, promptDisplayMs); // Hantar promptDisplayMs
    setupCopyButton(copyButtonEn, copyFeedbackEn, promptDisplayEn); // Hantar promptDisplayEn

    // --- Ciri "Eksport Prompt" ---
    function setupExportButton(buttonElement, displayElement, lang) { // Terima displayElement
        buttonElement.addEventListener('click', () => {
            const textToExport = displayElement.innerText; // Ambil teks dari displayElement
            if (textToExport && textToExport !== "Sila masukkan idea anda atau jana untuk inspirasi!" && textToExport !== "Please enter your ideas or generate for inspiration!") {
                const filename = `skrip_video_${lang}.txt`;
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToExport));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            } else {
                alert(`Tiada skrip untuk dieksport dalam ${lang === 'ms' ? 'Bahasa Melayu' : 'Bahasa Inggeris'}!`);
            }
        });
    }

    setupExportButton(exportButtonMs, promptDisplayMs, 'ms'); // Hantar promptDisplayMs
    setupExportButton(exportButtonEn, promptDisplayEn, 'en'); // Hantar promptDisplayEn

    // --- Ciri "Simpan Skrip Kegemaran" ---
    function loadSavedPrompts() {
        const saved = JSON.parse(localStorage.getItem('videoScripts')) || [];
        renderSavedPrompts(saved);
    }

    function savePrompt(promptText, lang) { // Terima promptText
        const saved = JSON.parse(localStorage.getItem('videoScripts')) || [];
        const entry = { text: promptText, lang: lang };

        if (!saved.some(item => item.text.trim() === entry.text.trim() && item.lang === entry.lang)) {
            saved.push(entry);
            localStorage.setItem('videoScripts', JSON.stringify(saved));
            renderSavedPrompts(saved);
            alert(`Skrip ${lang === 'ms' ? 'Melayu' : 'Inggeris'} disimpan!`);
        } else {
            alert(`Skrip ${lang === 'ms' ? 'Melayu' : 'Inggeris'} ini sudah ada dalam senarai kegemaran anda!`);
        }
    }

    // Pembetulan: Akses teks dari promptDisplayMs/En, bukan currentPromptTextMs/En
    saveButtonMs.addEventListener('click', () => {
        const textToSave = promptDisplayMs.innerText;
        if (textToSave && textToSave !== "Sila masukkan idea anda atau jana untuk inspirasi!") {
            savePrompt(textToSave, 'ms');
        } else {
            alert('Tiada skrip Melayu untuk disimpan!');
        }
    });

    saveButtonEn.addEventListener('click', () => {
        const textToSave = promptDisplayEn.innerText;
        if (textToSave && textToSave !== "Please enter your ideas or generate for inspiration!") {
            savePrompt(textToSave, 'en');
        } else {
            alert('No English script to save!');
        }
    });

    function deletePrompt(promptToDeleteText, promptToDeleteLang) {
        let saved = JSON.parse(localStorage.getItem('videoScripts')) || [];
        saved = saved.filter(item => !(item.text.trim() === promptToDeleteText.trim() && item.lang === promptToDeleteLang));
        localStorage.setItem('videoScripts', JSON.stringify(saved));
        renderSavedPrompts(saved);
    }

    function renderSavedPrompts(promptsArray) {
        savedPromptsList.innerHTML = '';
        if (promptsArray.length === 0) {
            savedPromptsList.innerHTML = '<li class="no-prompts-message">Tiada skrip yang disimpan lagi.</li>';
            clearSavedButton.style.display = 'none';
        } else {
            promptsArray.slice().reverse().forEach(item => {
                const li = document.createElement('li');
                const langLabel = item.lang === 'ms' ? '[BM]' : '[EN]';
                li.innerHTML = `
                    <span>${langLabel} ${item.text}</span>
                    <button class="delete-btn" data-prompt-text="${item.text}" data-prompt-lang="${item.lang}"><i class="fas fa-times-circle"></i></button>
                `;
                savedPromptsList.appendChild(li);
            });
            clearSavedButton.style.display = 'block';
        }
    }

    savedPromptsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn') || event.target.closest('.delete-btn')) {
            const btn = event.target.closest('.delete-btn');
            const promptToDeleteText = btn.dataset.promptText;
            const promptToDeleteLang = btn.dataset.promptLang;
            if (confirm(`Anda pasti ingin memadam skrip ${promptToDeleteLang === 'ms' ? 'Melayu' : 'Inggeris'} ini?`)) {
                deletePrompt(promptToDeleteText, promptToDeleteLang);
            }
        }
    });

    clearSavedButton.addEventListener('click', () => {
        if (confirm('Anda pasti ingin mengosongkan semua skrip yang disimpan?')) {
            localStorage.removeItem('videoScripts');
            renderSavedPrompts([]);
        }
    });

    // --- Ciri "Kosongkan Semua Input" ---
    clearInputsButton.addEventListener('click', () => {
        for (const category in inputFields) {
            inputFields[category].value = "";
        }
        generateBothPrompts(); // Jana semula untuk memaparkan prompt lalai
    });

    // --- Ciri Bantuan (Modal) ---
    helpButton.addEventListener('click', () => {
        helpModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // --- Event Listeners Awal ---
    generateButtonMs.addEventListener('click', generateBothPrompts);

    // Jana semula prompt setiap kali input diubah
    for (const category in inputFields) {
        inputFields[category].addEventListener('input', generateBothPrompts);
    }
    
    // Initial load
    generateBothPrompts();
    loadSavedPrompts();
    updateButtonStates();
});