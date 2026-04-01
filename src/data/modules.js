export const MODULES = [
  {
    id: 1,
    title: 'Comprendre ta peur',
    subtitle: 'La connaissance comme premier remède',
    description: "Découvre les mécanismes scientifiques derrière l'hémophobie et comprends pourquoi ton corps réagit comme il le fait.",
    duration: '15 min',
    xpBonus: 100,
    badge: { id: 'module_1', label: 'Prise de conscience', icon: '🧠' },
    exercises: [
      {
        type: 'reading',
        title: "Qu'est-ce que l'hémophobie ?",
        content: "L'hémophobie est la peur du sang. Elle touche entre 3 et 4 % de la population mondiale, ce qui en fait l'une des phobies les plus répandues. Si tu lis ces lignes, tu n'es pas seul·e — des millions de personnes partagent exactement ce que tu ressens.\n\nContrairement à ce que l'on pourrait penser, l'hémophobie n'est pas un signe de faiblesse. C'est une réponse physiologique très réelle, ancrée dans notre système nerveux. Le simple fait de voir du sang, d'en entendre parler ou même d'y penser peut déclencher des symptômes intenses : nausées, vertiges, sueurs froides, et parfois évanouissement.\n\nCe qui distingue l'hémophobie des autres phobies, c'est son mécanisme unique. La plupart des phobies provoquent une accélération du cœur et une montée d'adrénaline. L'hémophobie, elle, provoque souvent l'effet inverse : une chute soudaine de la pression artérielle. Ce phénomène s'appelle la réponse vasovagale.\n\nLa bonne nouvelle ? L'hémophobie est l'une des phobies les mieux traitées en thérapie comportementale. Les études montrent des taux de réussite supérieurs à 80 % avec des techniques adaptées — celles que tu vas apprendre ici, à ton rythme.",
        keyPoints: [
          "L'hémophobie touche 3 à 4 % de la population",
          "C'est une réponse physiologique réelle, pas une faiblesse",
          "Elle déclenche souvent une chute de pression artérielle (réponse vasovagale)",
          "Plus de 80 % des personnes traitées constatent une amélioration significative",
        ],
      },
      {
        type: 'reading',
        title: 'Le mécanisme vasovagal expliqué',
        content: "Pour comprendre ce qui se passe dans ton corps, il faut parler du nerf vague. Ce nerf — le plus long du système nerveux autonome — relie le cerveau à la plupart des organes vitaux : cœur, poumons, tube digestif.\n\nQuand tu aperçois du sang, ton cerveau envoie un signal d'alarme. Chez la plupart des gens, cela déclenche le système sympathique (le mode «combat ou fuite»), avec une accélération cardiaque. Mais dans le cas de l'hémophobie, le nerf vague contre-attaque avec une force inhabituelle : il ralentit le cœur et dilate les vaisseaux sanguins, provoquant une chute brutale de la pression artérielle. C'est la réponse vasovagale.\n\nRésultat : le cerveau reçoit momentanément moins de sang. D'où les vertiges, la pâleur, et parfois l'évanouissement. Ton corps n'est pas en danger — il réagit de façon exagérée à un signal qu'il interprète comme une menace.\n\nLa technique que tu vas apprendre — la tension musculaire appliquée — agit directement sur ce mécanisme. En contractant tes muscles, tu augmentes ta pression artérielle et tu neutralises la réponse vasovagale avant qu'elle ne t'emporte.",
        keyPoints: [
          "Le nerf vague régule le cœur, les poumons et la digestion",
          "La réponse vasovagale ralentit le cœur et fait chuter la pression artérielle",
          "Ce mécanisme est involontaire — ton corps réagit à une fausse alarme",
          "La tension musculaire appliquée permet de contrer cette réaction",
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Quel pourcentage de la population est touché par l'hémophobie ?",
            options: ['Moins de 1 %', 'Entre 3 et 4 %', 'Entre 10 et 15 %', 'Plus de 20 %'],
            correct: 1,
            explanation: "L'hémophobie touche entre 3 et 4 % de la population. C'est l'une des phobies les plus répandues, et tu n'es donc vraiment pas seul·e dans cette expérience.",
          },
          {
            question: "Qu'est-ce qui distingue l'hémophobie de la plupart des autres phobies ?",
            options: [
              "Elle provoque une accélération du cœur",
              "Elle est impossible à traiter",
              "Elle provoque une chute de la pression artérielle via le nerf vague",
              "Elle ne touche que les adultes",
            ],
            correct: 2,
            explanation: "Contrairement à la majorité des phobies qui accélèrent le cœur, l'hémophobie déclenche souvent une réponse vasovagale : le nerf vague provoque une chute de la pression artérielle, ce qui peut mener à l'évanouissement.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Maintenant que tu as compris les mécanismes de ta peur, comment te sens-tu ? Est-ce que savoir que c'est une réaction physiologique normale change quelque chose pour toi ?",
      },
    ],
  },

  {
    id: 2,
    title: 'Respirer pour contrôler',
    subtitle: 'Ton souffle, ton premier outil',
    description: "Apprends deux techniques de respiration puissantes pour calmer ton système nerveux et reprendre le contrôle face à l'anxiété.",
    duration: '20 min',
    xpBonus: 100,
    badge: { id: 'module_2', label: 'Maître du souffle', icon: '🫁' },
    exercises: [
      {
        type: 'reading',
        title: 'Respiration et système nerveux',
        content: "La respiration est l'un des rares processus corporels à la fois automatique et conscient. C'est une porte d'entrée directe sur ton système nerveux autonome — celui qui régule ta fréquence cardiaque, ta pression artérielle et ta réponse au stress.\n\nQuand tu ressens de l'anxiété, ta respiration devient rapide et superficielle. Cela active le système sympathique — le mode «alarme» — et entretient le cercle de la peur. En inversant ce processus, tu peux envoyer à ton cerveau un signal clair : il n'y a pas de danger.\n\nDeux techniques ont fait leurs preuves dans la gestion des phobies et de l'anxiété. La première est la cohérence cardiaque : inspirer et expirer sur un rythme de 5 secondes chacun. Ce rythme de 6 cycles par minute synchronise le cœur et le cerveau, réduit le cortisol et active le système parasympathique — ton mode «calme».\n\nLa seconde, la technique 4-7-8 développée par le Dr Andrew Weil, va encore plus loin. En prolongeant l'expiration à 8 secondes, elle maximise l'activation du nerf vague et produit un effet relaxant profond en quelques cycles seulement.\n\nUtilise ces techniques avant toute exposition, ou dès que tu sens l'anxiété monter.",
        keyPoints: [
          "La respiration est une porte d'accès directe au système nerveux autonome",
          "Respirer lentement active le système parasympathique (mode calme)",
          "La cohérence cardiaque : 5s inspire, 5s expire, 6 cycles/min",
          "La technique 4-7-8 prolonge l'expiration pour un effet relaxant profond",
        ],
      },
      {
        type: 'breathing',
        technique: 'cardiac',
        title: 'Cohérence cardiaque',
        description: "Inspire pendant 5 secondes, expire pendant 5 secondes. Laisse ton souffle devenir régulier et profond. Sens ton rythme cardiaque se stabiliser.",
      },
      {
        type: 'breathing',
        technique: '478',
        title: 'Technique 4-7-8',
        description: "Inspire 4 secondes, retiens ton souffle 7 secondes, expire lentement pendant 8 secondes. Cette technique active puissamment le nerf vague.",
      },
      {
        type: 'quiz',
        questions: [
          {
            question: 'Pourquoi la technique 4-7-8 est-elle particulièrement efficace ?',
            options: [
              "Parce qu'elle accélère le cœur",
              "Parce qu'elle prolonge l'expiration, maximisant l'activation du nerf vague",
              "Parce qu'elle doit être pratiquée 10 fois par jour",
              "Parce qu'elle augmente la pression artérielle",
            ],
            correct: 1,
            explanation: "La technique 4-7-8 est efficace parce que l'expiration prolongée (8 secondes) stimule fortement le nerf vague, activant le système parasympathique et produisant un effet calmant profond très rapidement.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Comment s'est passée ta pratique des deux techniques de respiration ? Laquelle t'a semblé la plus naturelle ou la plus efficace ? Note tes impressions.",
      },
    ],
  },

  {
    id: 3,
    title: 'Applied Tension',
    subtitle: 'La technique qui change tout',
    description: "Maîtrise la tension musculaire appliquée — la méthode scientifique d'Öst & Sterner pour contrer la réponse vasovagale.",
    duration: '25 min',
    xpBonus: 100,
    badge: { id: 'module_3', label: 'Tension maîtrisée', icon: '💪' },
    exercises: [
      {
        type: 'reading',
        title: "La technique d'Öst & Sterner",
        content: "En 1987, les chercheurs Lars-Göran Öst et Ulf Sterner ont développé une technique révolutionnaire spécifiquement pour l'hémophobie : la tension musculaire appliquée, ou «Applied Tension».\n\nLeur découverte était simple mais fondamentale : si l'hémophobie provoque une chute de la pression artérielle, il suffit de l'augmenter intentionnellement pour contrer la réponse vasovagale. Et la façon la plus directe d'augmenter sa pression artérielle ? Contracter ses muscles.\n\nLe principe est le suivant : quand tu contractes tes muscles — bras, jambes, abdomen — pendant 10 à 15 secondes, tu comprimes les vaisseaux sanguins et tu forces le sang vers le cerveau. La pression artérielle monte. La syncope devient impossible.\n\nLes études d'Öst & Sterner ont montré que cette technique réduit significativement les évanouissements et l'anxiété anticipatoire chez les personnes hémophobes, même lors d'expositions à des stimuli intenses comme une prise de sang ou une chirurgie mineure.\n\nLa clé est la pratique régulière. En répétant ces cycles de tension-relâchement, tu entraînes ton corps à répondre automatiquement à la peur par une contraction musculaire protectrice, plutôt que par une chute de tension.",
        keyPoints: [
          "Technique développée par Öst & Sterner en 1987",
          "La contraction musculaire augmente la pression artérielle",
          "Elle contrecarre directement la réponse vasovagale",
          "5 séries de 10 secondes par groupe musculaire",
          "La pratique régulière crée une réponse automatique protectrice",
        ],
      },
      {
        type: 'applied_tension',
        title: 'Tension des bras',
        muscleGroup: 'bras',
        instruction: "Tends les deux bras devant toi, serre les poings et contracte tous les muscles de tes bras — avant-bras, biceps, épaules — aussi fort que tu le peux confortablement. Maintiens cette tension.",
        rounds: 5,
      },
      {
        type: 'applied_tension',
        title: 'Tension des jambes',
        muscleGroup: 'jambes',
        instruction: "Assis·e ou debout, contracte les muscles de tes deux jambes : cuisses, mollets, et fesses. Imagine que tu essaies de soulever un poids très lourd avec tes jambes. Maintiens cette tension.",
        rounds: 5,
      },
      {
        type: 'applied_tension',
        title: 'Tension corps entier',
        muscleGroup: 'corps entier',
        instruction: "Combine maintenant bras et jambes : contracte simultanément tous les groupes musculaires. Bras serrés, jambes tendues, abdomen contracté. Ressens la montée de pression dans tout ton corps.",
        rounds: 5,
      },
      {
        type: 'journal',
        prompt: "Comment s'est passé l'exercice de tension musculaire ? As-tu ressenti une différence physique pendant les contractions ? Note ce que tu as observé dans ton corps.",
      },
    ],
  },

  {
    id: 4,
    title: 'Exposition par les couleurs',
    subtitle: 'Du rose au rouge, en douceur',
    description: "Une exposition progressive aux teintes rouges, de la plus douce à la plus intense. La tension musculaire sera ton alliée.",
    duration: '20 min',
    xpBonus: 100,
    badge: { id: 'module_4', label: 'Spectre maîtrisé', icon: '🎨' },
    exercises: [
      {
        type: 'reading',
        title: "L'exposition progressive : comment ça fonctionne",
        content: "L'exposition progressive est la pierre angulaire du traitement des phobies. Le principe est simple et scientifiquement validé : en t'exposant graduellement à ce qui te fait peur, dans un cadre sécurisé et avec les bons outils, ton système nerveux apprend que ce stimulus n'est pas dangereux.\n\nChaque exposition réussie envoie un message à ton cerveau : «Tu as survécu. Ce n'était pas une menace.» Au fil des répétitions, la réponse anxieuse diminue — c'est ce qu'on appelle l'habituation.\n\nNous allons commencer par les couleurs. Non pas parce que les couleurs sont dangereuses — bien sûr qu'elles ne le sont pas — mais parce que certaines teintes de rouge peuvent déclencher une réponse conditionnée chez les personnes hémophobes. En commençant par des roses très légers et en progressant vers des rouges plus profonds, tu entraînes ton cerveau à dissocier «rouge» de «danger».\n\nPendant chaque exposition, utilise la tension musculaire appliquée que tu as apprise. Contracte tes bras et tes jambes pendant que tu regardes la couleur. Cela maintient ta pression artérielle stable et renforce l'apprentissage positif.",
        keyPoints: [
          "L'exposition progressive habitue le système nerveux aux stimuli anxiogènes",
          "Chaque exposition réussie envoie un signal «pas de danger» au cerveau",
          "On part du plus doux pour aller vers le plus intense",
          "La tension musculaire doit être maintenue pendant toute l'exposition",
        ],
      },
      {
        type: 'color_exposure',
        colors: [
          { hex: '#FFE8E8', label: 'Rose très pâle — une teinte douce et apaisante' },
          { hex: '#FFCCCC', label: 'Rose clair — comme le ciel au lever du soleil' },
          { hex: '#FF8888', label: 'Rose soutenu — une couleur vive et chaleureuse' },
          { hex: '#EE3344', label: "Rouge vif — une couleur intense, rien de plus" },
          { hex: '#CC0022', label: 'Rouge profond — tu as traversé tout le spectre' },
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Quel est le mécanisme par lequel l'exposition progressive réduit l'anxiété ?",
            options: [
              "Elle élimine les souvenirs traumatiques",
              "Elle augmente la tolérance à la douleur",
              "Elle provoque l'habituation : le système nerveux apprend que le stimulus n'est pas dangereux",
              "Elle bloque chimiquement la réponse de peur",
            ],
            correct: 2,
            explanation: "L'exposition progressive fonctionne par habituation : à chaque exposition réussie, le cerveau enregistre «pas de danger» et la réponse anxieuse diminue progressivement. C'est un apprentissage neurologique réel.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Comment s'est passée ton exposition aux couleurs ? Quelle couleur a été la plus facile ? La plus difficile ? As-tu utilisé la tension musculaire ?",
      },
    ],
  },

  {
    id: 5,
    title: 'Exposition par les formes',
    subtitle: 'Des formes abstraites, pas de contexte',
    description: "Quatre formes évocatrices, présentées une à une. L'abstraction comme tremplin vers une exposition plus concrète.",
    duration: '20 min',
    xpBonus: 100,
    badge: { id: 'module_5', label: 'Formes apprivoisées', icon: '⬟' },
    exercises: [
      {
        type: 'reading',
        title: 'La puissance des formes abstraites',
        content: "Notre cerveau est un machine à reconnaître des patterns. Avant même que nous ayons identifié consciemment un objet, notre cortex visuel a déjà analysé ses formes, ses contours et ses couleurs. C'est pour cela que certaines formes peuvent déclencher une réponse émotionnelle instantanée.\n\nLes formes que tu vas observer dans ce module sont abstraites — elles ne représentent rien de réel. Pourtant, leur aspect pourrait évoquer quelque chose. C'est précisément le but : t'habituer à ces associations visuelles dans un cadre entièrement sécurisé, sans aucun contenu choquant.\n\nEn regardant ces formes tout en maintenant la tension musculaire, tu entraînes ton cerveau à dissocier «formes évocatrices» de «danger imminent». C'est une étape essentielle avant d'aborder des représentations plus concrètes.\n\nPrends ton temps avec chaque forme. Observe-la vraiment. Remarque les détails, les contours, les variations. Plus tu la regardes attentivement, plus l'exposition est efficace.",
        keyPoints: [
          "Le cerveau reconnaît les formes avant même la conscience claire",
          "Les formes abstraites permettent une exposition sans contenu choquant",
          "Observer attentivement renforce l'effet d'habituation",
          "La tension musculaire doit accompagner chaque observation",
        ],
      },
      {
        type: 'shape_exposure',
        shapes: [
          { label: 'Cercle — une forme simple et fermée', variant: 'circle' },
          { label: 'Goutte — une forme fluide et organique', variant: 'drop' },
          { label: 'Éclaboussure — une forme dynamique et irrégulière', variant: 'splatter' },
          { label: 'Forme complexe — plusieurs éléments combinés', variant: 'complex' },
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Pourquoi commence-t-on par des formes abstraites plutôt que des images réalistes ?",
            options: [
              "Parce que les formes abstraites sont plus jolies",
              "Pour habituer progressivement le cerveau aux associations visuelles dans un cadre sécurisé",
              "Parce que les images réalistes sont interdites par la loi",
              "Pour tester la vue de l'utilisateur",
            ],
            correct: 1,
            explanation: "Les formes abstraites permettent une première habituation aux associations visuelles potentiellement anxiogènes, sans exposer à un contenu concret. C'est une étape intermédiaire clé dans la progression thérapeutique.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Quelle forme a été la plus facile à observer ? Laquelle a provoqué le plus de réaction ? As-tu senti la différence avec et sans tension musculaire ?",
      },
    ],
  },

  {
    id: 6,
    title: 'Exposition par les images',
    subtitle: 'Du plus abstrait au plus concret',
    description: "Trois niveaux d'images, de l'abstraction à la représentation médicale réaliste. Tu as tous les outils pour traverser ça.",
    duration: '25 min',
    xpBonus: 100,
    badge: { id: 'module_6', label: 'Regard posé', icon: '👁️' },
    exercises: [
      {
        type: 'reading',
        title: 'Préparer ton regard',
        content: "Tu arrives à une étape importante de ton parcours. Jusqu'ici, tu as travaillé avec des couleurs et des formes abstraites. Dans ce module, tu vas progresser vers des représentations visuelles plus concrètes, organisées en trois niveaux d'intensité croissante.\n\nLe niveau 1 est une composition artistique abstraite utilisant des teintes rouges. Elle n'est pas réaliste, mais elle mobilise tes associations visuelles de manière plus directe que les exercices précédents.\n\nLe niveau 2 est un schéma médical stylisé — le type d'illustration qu'on trouve dans les manuels médicaux ou les applications de santé. Reconnaissable mais épuré.\n\nLe niveau 3 est une représentation médicale plus réaliste, similaire à ce qu'on pourrait voir dans un contexte médical réel. C'est le niveau le plus intense de ce module.\n\nAvant chaque image, commence par contracter tes muscles. Maintiens la tension pendant que tu regardes. Respire normalement. Si tu ressens le besoin de t'arrêter, c'est tout à fait acceptable — reprends quand tu es prêt·e. Il n'y a aucune urgence.",
        keyPoints: [
          "Trois niveaux progressifs : abstrait, schéma médical, représentation réaliste",
          "Contracter les muscles AVANT de regarder chaque image",
          "Maintenir la tension pendant toute l'observation",
          "Il est normal de ressentir une légère anxiété — c'est le signe que l'exposition fonctionne",
        ],
      },
      {
        type: 'image_exposure',
        level: 1,
        title: 'Niveau 1 — Composition abstraite',
        description: "Une composition artistique en teintes rouges. Observe les formes et les dégradés, sans chercher à interpréter.",
      },
      {
        type: 'image_exposure',
        level: 2,
        title: 'Niveau 2 — Schéma médical',
        description: "Un schéma stylisé de type médical. Ce genre d'illustration se trouve dans tous les manuels de biologie et applications de santé.",
      },
      {
        type: 'image_exposure',
        level: 3,
        title: 'Niveau 3 — Représentation médicale',
        description: "Une représentation plus réaliste dans un contexte médical. Tu as tous les outils pour traverser ça calmement.",
      },
      {
        type: 'journal',
        prompt: "Tu viens de traverser les trois niveaux d'exposition visuelle. Comment t'es-tu senti·e avant, pendant et après ? Quel niveau a été le plus challengeant ?",
      },
    ],
  },

  {
    id: 7,
    title: 'Maîtrise totale',
    subtitle: 'Prêt·e pour la vraie vie',
    description: "Des scénarios réels, des stratégies concrètes. Tu appliques tout ce que tu as appris dans des situations du quotidien.",
    duration: '30 min',
    xpBonus: 150,
    badge: { id: 'module_7', label: 'Maître absolu', icon: '🏆' },
    exercises: [
      {
        type: 'reading',
        title: 'De la théorie à la pratique',
        content: "Tu as parcouru un long chemin. Tu comprends les mécanismes de ta peur, tu maîtrises deux techniques de respiration, tu pratiques la tension musculaire appliquée, et tu as traversé des expositions visuelles progressives.\n\nCe dernier module est celui de l'intégration. Ici, tu vas appliquer toutes ces compétences dans des scénarios de la vie réelle — les situations que tu redoutais peut-être avant de commencer ce programme.\n\nLa clé de la maîtrise, ce n'est pas l'absence totale de peur. C'est la capacité à agir malgré la peur, avec des outils concrets pour la gérer. La plupart des personnes qui terminent ce programme ne deviennent pas insensibles au sang — elles deviennent capables de faire face à une prise de sang, d'accompagner un proche blessé, de regarder une scène médicale à la télévision, sans être dépassées.\n\nLis chaque scénario attentivement. Visualise-toi en train de traverser les étapes. Ressens ce que tu ressentirais — et remarque que tu as maintenant les outils pour gérer ça.\n\nTu n'es plus la même personne qu'au début de ce programme.",
        keyPoints: [
          "La maîtrise = agir avec ses outils malgré la peur, pas l'absence de peur",
          "Les outils acquis : compréhension, respiration, tension musculaire, habituations",
          "Les scénarios permettent de répéter mentalement avant la situation réelle",
          "La visualisation renforce les connexions neuronales protectrices",
        ],
      },
      {
        type: 'scenario',
        title: 'Scénario 1 : La prise de sang',
        situation: "Tu arrives à un laboratoire d'analyses médicales pour une prise de sang prescrite par ton médecin. La salle d'attente est calme. Une infirmière t'appelle.",
        steps: [
          {
            instruction: "En t'asseyant dans la salle d'attente, tu remarques une légère montée d'anxiété. Tu sors ton téléphone pour l'occuper, mais d'abord : tu commences à contracter discrètement les muscles de tes jambes.",
            tip: "La tension musculaire peut se pratiquer entièrement inaperçue. Personne ne verra que tu contractes tes cuisses sous la chaise.",
          },
          {
            instruction: "L'infirmière t'appelle. En marchant vers la salle, tu enchaînes deux cycles de respiration 4-7-8. Inspire 4, retiens 7, expire 8. Une fois, puis deux fois.",
            tip: "La respiration 4-7-8 peut se faire en marchant. Personne ne remarquera que tu gères activement ton système nerveux.",
          },
          {
            instruction: "Assis·e sur la chaise, l'infirmière prépare son matériel. Tu contractes maintenant les deux bras et les deux jambes simultanément. Tu maintiens cette tension pendant qu'elle effectue le prélèvement.",
            tip: "Détourne le regard si tu le souhaites — c'est tout à fait acceptable. L'important est de maintenir la tension musculaire, pas de regarder l'aiguille.",
          },
          {
            instruction: "C'est terminé. L'infirmière applique un coton. Tu relâches progressivement la tension musculaire. Tu respires normalement. Tu réalises que tu as traversé ça, avec tes outils.",
            tip: "Après chaque exposition réussie, prends un moment pour reconnaître ce que tu viens d'accomplir. Chaque succès renforce le chemin pour la prochaine fois.",
          },
        ],
      },
      {
        type: 'scenario',
        title: "Scénario 2 : Accompagner quelqu'un de blessé",
        situation: "Un ami s'est blessé à la main en cuisinant. Il saigne et a besoin de ton aide pour désinfecter et bander la plaie.",
        steps: [
          {
            instruction: "Tu entends ton ami crier depuis la cuisine. En t'approchant, tu aperçois du sang sur le comptoir. Avant de regarder sa main : contracte immédiatement tes bras et tes jambes.",
            tip: "La tension musculaire préventive est plus efficace que la tension réactive. Commence à contracter dès que tu anticipes l'exposition, avant même de voir quoi que ce soit.",
          },
          {
            instruction: "Tu évalues la situation : la blessure n'est pas profonde. Tu lui demandes de presser un tissu propre sur sa main. Tu prends trois respirations profondes — inspire 5, expire 5 — tout en maintenant la tension musculaire.",
            tip: "Dans une urgence, ton calme est ta contribution la plus précieuse. Les autres techniques ne servent pas seulement à te protéger — elles te permettent d'être là pour les autres.",
          },
          {
            instruction: "Tu ouvres la trousse de premiers secours et tu prépares le nécessaire : désinfectant, compresses, bandage. Tu maintiens la tension dans tes jambes pendant que tu travailles avec tes mains.",
            tip: "Tu peux maintenir la tension dans une partie du corps pendant que l'autre partie travaille. Les jambes contractées suffisent à maintenir la pression artérielle pendant que les mains s'occupent du soin.",
          },
          {
            instruction: "Tu appliques le désinfectant, poses la compresse, fixes le bandage. Ton ami te remercie. Tu relâches la tension, tu respires. Tu réalises que non seulement tu as géré ta propre anxiété — mais que tu as pu vraiment aider.",
            tip: "C'est ça, la maîtrise totale : ne plus être limité·e par ta peur. Être disponible pour toi-même et pour les autres dans les moments qui comptent.",
          },
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Dans un scénario réel comme une prise de sang, quand faut-il commencer la tension musculaire ?",
            options: [
              "Seulement au moment de l'aiguille",
              "Le plus tôt possible, dès l'anticipation de l'exposition",
              "Uniquement si on se sent mal",
              "Après la prise de sang, pour récupérer",
            ],
            correct: 1,
            explanation: "La tension musculaire préventive est plus efficace que la tension réactive. En commençant dès l'anticipation, tu maintiens ta pression artérielle stable avant que la réponse vasovagale ne commence.",
          },
          {
            question: "Qu'est-ce que la maîtrise totale de l'hémophobie signifie vraiment ?",
            options: [
              "Ne plus jamais ressentir de peur face au sang",
              "Devenir infirmier ou infirmière",
              "Être capable d'agir avec ses outils malgré la peur, sans être dépassé·e",
              "Ignorer complètement la peur",
            ],
            correct: 2,
            explanation: "La maîtrise n'est pas l'absence de peur — c'est la capacité à agir malgré elle, avec des outils concrets. La peur peut rester présente à un niveau gérable, et c'est tout à fait normal et suffisant.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Tu as terminé le programme complet. Comment te sens-tu en ce moment, comparé au début ? Qu'est-ce que tu as appris sur toi-même ? Quelle situation de ta vraie vie te semble maintenant plus accessible ?",
      },
    ],
  },
]
