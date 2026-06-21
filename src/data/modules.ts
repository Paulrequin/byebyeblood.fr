import type { Module } from '@/types'

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Comprendre ta peur',
    subtitle: 'La connaissance comme premier remède',
    description: "Découvre les mécanismes scientifiques derrière l'hémophobie et comprends pourquoi ton corps réagit comme il le fait.",
    duration: '20 min',
    xpBonus: 100,
    badge: { id: 'module_1', label: 'Prise de conscience', icon: '🧠' },
    exercises: [
      {
        type: 'reading',
        title: "Qu'est-ce que l'hémophobie ?",
        content: "L'hémophobie est la peur du sang. Elle touche entre 3 et 4 % de la population mondiale, ce qui en fait l'une des phobies les plus répandues. Si tu lis ces lignes, tu n'es pas seul·e, des millions de personnes partagent exactement ce que tu ressens.\n\nContrairement à ce que l'on pourrait penser, l'hémophobie n'est pas un signe de faiblesse. C'est une réponse physiologique très réelle, ancrée dans notre système nerveux. Le simple fait de voir du sang, d'en entendre parler ou même d'y penser peut déclencher des symptômes intenses : nausées, vertiges, sueurs froides, et parfois évanouissement.\n\nCe qui distingue l'hémophobie des autres phobies, c'est son mécanisme unique. La plupart des phobies provoquent une accélération du cœur et une montée d'adrénaline. L'hémophobie, elle, provoque souvent l'effet inverse : une chute soudaine de la pression artérielle. Ce phénomène s'appelle la réponse vasovagale.\n\nLa bonne nouvelle ? L'hémophobie est l'une des phobies les mieux traitées en thérapie comportementale. Les études montrent des taux de réussite supérieurs à 80 % avec des techniques adaptées, celles que tu vas apprendre ici, à ton rythme.",
        keyPoints: [
          "L'hémophobie touche 3 à 4 % de la population",
          "C'est une réponse physiologique réelle, pas une faiblesse",
          "Elle déclenche souvent une chute de pression artérielle (réponse vasovagale)",
          "Plus de 80 % des personnes traitées constatent une amélioration significative",
        ],
        studies: [
          {
            authors: "Öst, L.-G.",
            year: 1992,
            finding: "La prévalence de l'hémophobie dans la population générale est estimée entre 3 et 4 %. Dans les contextes médicaux, cette proportion peut atteindre 10 à 15 % des patients.",
            source: "Behaviour Research and Therapy",
          },
          {
            authors: "Öst, L.-G.",
            year: 1996,
            finding: "Une revue de 8 études sur l'hémophobie traitée par thérapie comportementale montre un taux d'amélioration supérieur à 80 % des patients, maintenu à un an de suivi.",
            source: "Behaviour Research and Therapy, méta-analyse sur 122 patients",
          },
        ],
        sources: ['bienvenu1998'],
      },
      {
        type: 'reading',
        title: 'Le mécanisme vasovagal expliqué',
        content: "Pour comprendre ce qui se passe dans ton corps, il faut parler du nerf vague. Ce nerf, le plus long du système nerveux autonome, relie le cerveau à la plupart des organes vitaux : cœur, poumons, tube digestif.\n\nQuand tu aperçois du sang, ton cerveau envoie un signal d'alarme. Chez la plupart des gens, cela déclenche le système sympathique (le mode «combat ou fuite»), avec une accélération cardiaque. Mais dans le cas de l'hémophobie, le nerf vague contre-attaque avec une force inhabituelle : il ralentit le cœur et dilate les vaisseaux sanguins, provoquant une chute brutale de la pression artérielle. C'est la réponse vasovagale.\n\nRésultat : le cerveau reçoit momentanément moins de sang. D'où les vertiges, la pâleur, et parfois l'évanouissement. Ton corps n'est pas en danger, il réagit de façon exagérée à un signal qu'il interprète comme une menace.\n\nLa technique que tu vas apprendre, la tension musculaire appliquée, agit directement sur ce mécanisme. En contractant tes muscles, tu augmentes ta pression artérielle et tu neutralises la réponse vasovagale avant qu'elle ne t'emporte.",
        keyPoints: [
          "Le nerf vague régule le cœur, les poumons et la digestion",
          "La réponse vasovagale ralentit le cœur et fait chuter la pression artérielle",
          "Ce mécanisme est involontaire : ton corps réagit à une fausse alarme",
          "La tension musculaire appliquée permet de contrer cette réaction",
        ],
        studies: [
          {
            authors: "Öst, L.-G. & Sterner, U.",
            year: 1987,
            finding: "Première démonstration clinique que la tension musculaire appliquée permet de contrer directement la réponse vasovagale chez les hémophobes. Sur les patients traités, aucun évanouissement ne s'est produit pendant les expositions après apprentissage de la technique.",
            source: "Behaviour Research and Therapy, Université d'Uppsala, Suède",
          },
          {
            authors: "Bracha, H. S. et al.",
            year: 2004,
            finding: "L'origine évolutive de la réponse vasovagale est liée à un réflexe de mort feinte face aux prédateurs. Ce mécanisme archaïque, utile pour nos ancêtres, se déclenche de façon inadaptée chez les hémophobes modernes.",
            source: "Hawaii Medical Journal",
          },
        ],
        sources: ['graham1961', 'foulds1990'],
      },
      {
        type: 'reading',
        title: 'ACT : Le piège du contrôle',
        content: "Il y a quelque chose de paradoxal dans la façon dont nous traitons la peur. Notre instinct naturel est de la combattre, de la fuir, de la contrôler à tout prix. Steven Hayes, psychologue américain et fondateur de la Thérapie d'Acceptation et d'Engagement (ACT), a passé des décennies à étudier ce que cette stratégie produit réellement.\n\nSa conclusion est contre-intuitive : plus on lutte contre une émotion difficile, plus elle prend de la place. Ce phénomène s'appelle «le piège du contrôle». Chaque fois que tu évites une situation liée au sang, ton cerveau enregistre un message : «Nous avons échappé à un danger. Ce danger est réel.» L'évitement renforce la peur au lieu de la dissoudre.\n\nHayes utilise une métaphore frappante : imagine que tu tiens un tigre en laisse. Plus tu tires sur la laisse pour t'éloigner du tigre, plus tu te bats avec lui. L'ACT propose une alternative radicale : ne pas essayer d'éliminer la peur, mais changer ta relation avec elle. Apprendre à la tenir sans être tenu par elle.\n\nCe programme combine deux approches complémentaires. La thérapie d'exposition te donne des outils physiologiques concrets. L'ACT transforme ta relation avec la peur elle-même. Ensemble, elles agissent à deux niveaux : ton corps et ta façon de te voir toi-même face à l'adversité.",
        keyPoints: [
          "Lutter contre la peur la renforce, c'est le piège du contrôle (Hayes)",
          "L'évitement envoie au cerveau un signal : «le danger est réel»",
          "L'ACT propose de changer sa relation à la peur, pas de l'éliminer",
          "Ce programme combine exposition (corps) et ACT (relation à l'expérience)",
        ],
        sources: ['atjak2015'],
        studies: [
          {
            authors: "Wegner, D. M., Schneider, D. J., Carter, S. R. & White, T. L.",
            year: 1987,
            finding: "Dans ce qui est devenu l'expérience classique de «l'ours blanc», les participants instruits de ne PAS penser à un ours blanc ne peuvent s'empêcher d'y penser. Pire : après la période de suppression, les pensées reviennent deux fois plus souvent. C'est l'effet rebond de la suppression mentale.",
            source: "Journal of Personality and Social Psychology, Université de Harvard",
          },
          {
            authors: "Hayes, S. C., Wilson, K. G., Gifford, E. V., Follette, V. M. & Strosahl, K.",
            year: 1996,
            finding: "L'évitement expérientiel, c'est-à-dire les efforts pour contrôler ou supprimer ses propres émotions et pensées, est identifié comme un facteur central dans le développement et le maintien de nombreux troubles psychologiques.",
            source: "Psychological Review",
          },
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
            question: "Selon Steven Hayes, que se passe-t-il quand on lutte activement contre sa peur ?",
            options: [
              "La peur diminue rapidement",
              "La peur prend davantage de place, c'est le piège du contrôle",
              "Le cerveau oublie la peur avec le temps",
              "L'évitement est la meilleure stratégie à long terme",
            ],
            correct: 1,
            explanation: "Hayes a montré que l'effort de contrôle émotionnel renforce paradoxalement la peur. L'évitement confirme au cerveau que le stimulus est dangereux. L'ACT propose de changer sa relation à la peur plutôt que de la combattre.",
          },
        ],
      },
      {
        type: 'reading',
        title: 'Pourquoi tenir un journal',
        content: "La phobie est une dérégulation du système d'alarme. Ton amygdale, la région du cerveau qui détecte le danger, a appris à déclencher une alerte maximale face au sang, même quand aucun danger réel n'existe. Le problème n'est pas que tu aies peur : la peur est utile. Le problème, c'est que ton cerveau ne fait plus la différence entre une menace réelle et une image, un mot, une pensée.\n\nPour désapprendre cette confusion, tu dois d'abord apprendre à l'observer. C'est là qu'intervient le journal.\n\nCe que le journal fait pour toi\n\nÉcrire sur ce que tu ressens n'est pas un exercice de style. C'est un outil neurologique. Quand tu mets des mots sur une émotion, tu actives le cortex préfrontal, la partie rationnelle de ton cerveau, qui modère l'activité de l'amygdale. Des études en neurosciences affectives (notamment les travaux de Matthew Lieberman à l'UCLA) montrent que simplement nommer une émotion réduit mesurably son intensité.\n\nMais le journal sert aussi à quelque chose de plus précis : calibrer ta peur. Apprendre à distinguer ce qui est vrai de ce qui est irrationnel.\n\nLa note de 1 à 10\n\nÀ chaque session, tu vas noter ton état sur une échelle de 1 à 10. Ce chiffre n'est pas une évaluation de ta valeur ni de ton courage. C'est une mesure brute de ce que ton corps ressent à cet instant.\n\n1-3 : calme, présent·e, peu ou pas d'anxiété physique.\n4-6 : inconfort notable, tension, léger vertige possible. L'alarme s'active, mais tu restes fonctionnel·le.\n7-8 : anxiété forte, respiration courte, envie de fuir. Ton corps croit à un danger réel.\n9-10 : réponse vasovagale imminente ou déclenchée, très forte détresse.\n\nEn notant ce chiffre régulièrement, tu vas commencer à voir deux choses. D'abord, que le même stimulus peut déclencher des niveaux très différents selon ton état du jour, ton niveau de fatigue, ou si tu as pratiqué tes outils. Ensuite, que sur la durée du programme, les chiffres descendent. Pas en ligne droite, pas sans rechutes, mais ils descendent. Ce mouvement vers le bas, c'est la preuve que ton cerveau réapprend.\n\nApprendre à voir la peur réelle et la peur apprise\n\nUne peur réelle répond à une menace concrète, présente, dans ton environnement immédiat. Une peur apprise répond à un signal conditionné, une image, une pensée, une couleur, qui a été associée par le passé à une expérience difficile.\n\nLa phobie est presque entièrement de la deuxième catégorie. Aucune photo ne peut te blesser. Aucun mot n'est dangereux. Mais ton cerveau, par association, a appris à traiter ces signaux comme des alertes réelles.\n\nLe journal est l'outil qui te permet de faire cette distinction, progressivement, séance après séance. En écrivant «j'ai ressenti 7, mais je n'étais pas en danger», tu commences à rééduquer l'amygdale. Tu lui montres que l'alarme s'est déclenchée, mais que rien de grave ne s'est passé. C'est exactement le même mécanisme que l'exposition progressive, mais appliqué à ta façon de penser.",
        keyPoints: [
          "La phobie est une dérégulation du système d'alarme, pas un signe de faiblesse",
          "Nommer une émotion active le cortex préfrontal et réduit l'activité de l'amygdale",
          "La note de 1 à 10 mesure l'intensité physique, pas ton courage",
          "Sur la durée, les notes descendent : c'est la preuve que le cerveau réapprend",
          "Le journal apprend à distinguer peur réelle (danger présent) et peur apprise (signal conditionné)",
        ],
        studies: [
          {
            authors: "Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H. & Way, B. M.",
            year: 2007,
            finding: "Mettre des mots sur une émotion, même sans chercher à la changer, réduit mesurably l'activité de l'amygdale et diminue l'intensité émotionnelle perçue. L'IRMf montre une activation simultanée du cortex préfrontal droit, la région de la régulation émotionnelle.",
            source: "Psychological Science, UCLA",
          },
          {
            authors: "Pennebaker, J. W. & Beall, S. K.",
            year: 1986,
            finding: "Écrire sur des expériences émotionnellement difficiles pendant 4 jours consécutifs améliore la santé physique mesurée et réduit le nombre de visites médicales dans les six mois suivants, comparé à un groupe contrôle.",
            source: "Journal of Abnormal Psychology, Université du Texas à Austin",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Maintenant que tu comprends les mécanismes de ta peur et le piège du contrôle, réfléchis : dans quelles situations as-tu tendance à éviter ou fuir ce qui est lié au sang ? Qu'est-ce que cet évitement t'a coûté jusqu'ici dans ta vie ?",
      },
    ],
  },

  {
    id: 2,
    title: 'Respirer pour contrôler',
    subtitle: 'Ton souffle, ton premier outil',
    description: "Apprends deux techniques de respiration puissantes pour calmer ton système nerveux et revenir au moment présent.",
    duration: '25 min',
    xpBonus: 100,
    badge: { id: 'module_2', label: 'Maître du souffle', icon: '🫁' },
    exercises: [
      {
        type: 'reading',
        title: 'Respiration et système nerveux',
        content: "La respiration est l'un des rares processus corporels à la fois automatique et conscient. C'est une porte d'entrée directe sur ton système nerveux autonome, celui qui régule ta fréquence cardiaque, ta pression artérielle et ta réponse au stress.\n\nQuand tu ressens de l'anxiété, ta respiration devient rapide et superficielle. Cela active le système sympathique, le mode «alarme», et entretient le cercle de la peur. En inversant ce processus, tu peux envoyer à ton cerveau un signal clair : il n'y a pas de danger.\n\nLa cohérence cardiaque\n\nLa première technique est la cohérence cardiaque : inspirer et expirer sur un rythme de 5 secondes chacun. Ce rythme de 6 cycles par minute crée une synchronisation entre le cœur et le cerveau, c'est ce qu'on appelle la variabilité de la fréquence cardiaque (VFC). Quand cette synchronisation est optimale, le cortisol baisse, le système parasympathique prend le relais, et tu entres dans un état de calme actif. Cinq minutes suffisent pour en ressentir les effets.\n\nLa technique 4-7-8\n\nLa technique 4-7-8, développée par le Dr Andrew Weil, médecin à l'Université d'Arizona et pionnier de la médecine intégrative, va encore plus loin. Elle repose sur un principe simple mais puissant : l'expiration prolongée active le nerf vague de façon bien plus intense qu'une expiration normale.\n\nLe rythme est le suivant : inspire par le nez pendant 4 secondes, retiens ton souffle pendant 7 secondes, expire lentement par la bouche pendant 8 secondes. Ce cycle se répète 4 fois.\n\nPourquoi ça marche aussi bien ? Chaque phase a un rôle précis. L'inspiration de 4 secondes remplit les poumons sans forcer. La rétention de 7 secondes permet à l'oxygène de se diffuser plus profondément dans le sang et laisse le système nerveux s'installer dans un état de suspension. C'est dans cet instant de retenue que l'anxiété commence à perdre sa prise. L'expiration de 8 secondes, deux fois plus longue que l'inspiration, est la clé de voûte. Le nerf vague, qui longe la gorge et descend jusqu'aux organes, est directement stimulé par ce flux d'air lent et prolongé. Il envoie alors un signal direct au cœur pour ralentir, et au cerveau pour passer en mode parasympathique.\n\nLe Dr Weil décrit cette technique comme un «tranquillisant naturel pour le système nerveux». Contrairement aux médicaments, son effet s'installe dès les premiers cycles et s'améliore avec la pratique régulière. Après 4 à 6 semaines de pratique quotidienne, la réponse du corps devient quasi automatique : la simple initiation du cycle suffit à enclencher la réponse calmante.\n\nUtilise la cohérence cardiaque pour t'ancrer sur la durée. Utilise la 4-7-8 dans les moments aigus : avant une exposition, dans une salle d'attente, ou dès que tu sens l'anxiété monter.\n\nUne précision importante : ces techniques de respiration calment l'anxiété générale, mais elles ne suffisent pas à elles seules à prévenir un malaise vasovagal. Respirer profondément détend le corps, or chez une personne hémophobe, c'est justement la chute de pression artérielle qu'il faut contrer, pas seulement l'anxiété. C'est pour cette raison qu'Öst et Sterner ont mis au point une technique spécifique, la tension musculaire appliquée, que tu découvriras dans le module suivant. Retiens cette règle simple : la respiration calme l'esprit, la tension musculaire protège le corps. Lors d'une exposition réelle, les deux se combinent, mais c'est la tension qui fait le travail contre l'évanouissement.",
        keyPoints: [
          "La respiration est une porte d'accès directe au système nerveux autonome",
          "Cohérence cardiaque : 5s inspire / 5s expire, synchronise cœur et cerveau",
          "4-7-8 : inspire 4s, retiens 7s, expire 8s, stimule directement le nerf vague",
          "L'expiration prolongée (ratio 1:2) est la clé : elle active le mode parasympathique",
          "Effet immédiat dès les premiers cycles, renforcé par la pratique régulière",
          "Important : la respiration calme l'anxiété, mais seule la tension musculaire (module 3) protège contre le malaise vasovagal",
        ],
        sources: ['you2021', 'laborde2022', 'aktas2023'],
        studies: [
          {
            authors: "Zaccaro, A., Piarulli, A., Laurino, M., Garbella, E., Menicucci, D., Neri, B. & Gemignani, A.",
            year: 2018,
            finding: "Une revue systématique de 15 études contrôlées montre que la respiration lente (4 à 10 cycles par minute) réduit significativement l'anxiété, améliore la variabilité de la fréquence cardiaque et augmente le bien-être subjectif chez des sujets sains et cliniques.",
            source: "Frontiers in Human Neuroscience",
          },
          {
            authors: "Jerath, R., Edry, J. W., Barnes, V. A. & Jerath, V.",
            year: 2006,
            finding: "L'expiration prolongée stimule directement les récepteurs pulmonaires connectés au nerf vague. Un ratio expiration/inspiration de 2:1 maximalise l'activation du système parasympathique et la réduction du cortisol.",
            source: "Medical Hypotheses",
          },
        ],
      },
      {
        type: 'reading',
        title: 'ACT : Le moment présent comme ancre',
        content: "Pourquoi l'anxiété vit dans le temps\n\nL'anxiété vit rarement dans le présent. Elle habite le futur, «Et si je m'évanouis à la prise de sang ?», ou le passé, «La dernière fois, j'ai paniqué devant tout le monde.» Ces deux voyages temporels ont un point commun : ils sont construits par ton esprit, pas dictés par la réalité du moment.\n\nLes neurosciences ont un nom pour cette activité mentale : le réseau par défaut. C'est un ensemble de régions cérébrales qui s'active précisément quand tu n'es PAS en train de traiter quelque chose dans ton environnement immédiat. Quand ton esprit divague, projette, rumine, il consomme du carburant mental. Et dans le contexte de la phobie, ce carburant alimente l'anxiété anticipatoire : la peur de la peur, avant même que le stimulus soit là.\n\nSteven Hayes, en développant l'ACT dans les années 1980 avec son équipe de l'Université du Nevada, a identifié le contact avec le moment présent comme l'un des six processus fondamentaux de la flexibilité psychologique. Pas le plus spectaculaire, mais l'un des plus puissants. Parce que la souffrance psychologique est presque toujours temporelle : elle parle d'hier ou de demain.\n\nCe que la pleine conscience n'est pas\n\nLa pleine conscience, mindfulness en anglais, popularisée en clinique par Jon Kabat-Zinn à l'Université du Massachusetts dans les années 1970, est souvent mal comprise. Ce n'est pas une technique de relaxation. Ce n'est pas vider son esprit. Ce n'est pas atteindre un état de calme parfait.\n\nC'est une façon d'observer ce qui est là, maintenant, sans chercher à le changer ni à s'en débarrasser.\n\nCette nuance est essentielle. Si tu utilises la respiration consciente pour «chasser» l'anxiété, tu tombes dans le piège du contrôle que Hayes décrit dans le module précédent. Tu combats. Et le combat amplifie ce qu'il cherche à éliminer.\n\nEn revanche, si tu respires en observant l'anxiété comme un phénomène qui se passe en toi, sans en être submergé·e, quelque chose change. La pensée «je vais m'évanouir» peut traverser ton esprit. Et toi, tu es là, qui la regardes traverser.\n\nLa respiration comme ancre sensorielle\n\nQuand tu portes ton attention sur ta respiration, tu ancres ton système nerveux dans le présent sensoriel : la sensation de l'air qui entre par le nez, la légère fraîcheur, l'expansion de la poitrine, la détente à l'expiration. Ce sont des signaux physiques, ici et maintenant, qui court-circuitent la boucle du réseau par défaut.\n\nC'est pourquoi la cohérence cardiaque et la technique 4-7-8 ne sont pas juste des outils physiologiques. Ce sont aussi des pratiques d'ancrage attentionnel. En suivant le compte des secondes, en ressentant le souffle, tu occupes les ressources cognitives qui alimentaient l'anxiété anticipatoire.\n\nCe que tu vas pratiquer maintenant\n\nPendant les exercices de respiration qui suivent, essaie ceci : au lieu de vouloir que l'anxiété disparaisse, observe simplement ce qui est là. La tension dans ta poitrine, si elle est là. Le rythme de ton coeur. La texture de l'air. Les sons autour de toi.\n\nTu n'es pas en train de fuir, tu es en train de regarder, depuis un endroit stable en toi. C'est cet endroit stable, présent dans chaque être humain, que Hayes appelle le «soi comme contexte». Tu y reviendras dans les modules suivants. Pour l'instant, il suffit de le toucher, le temps d'un souffle.",
        keyPoints: [
          "L'anxiété est presque toujours temporelle : elle vit dans le futur imaginé ou le passé remémoré",
          "Le réseau par défaut du cerveau alimente l'anxiété anticipatoire quand l'esprit divague",
          "La pleine conscience n'est pas relaxation : c'est observer sans chercher à changer",
          "La respiration ancre le système nerveux dans le présent sensoriel, coupant la boucle anxieuse",
          "On peut observer la peur sans lui obéir : c'est l'apprentissage central de cette pratique",
        ],
        studies: [
          {
            authors: "Raichle, M. E., MacLeod, A. M., Snyder, A. Z., Powers, W. J., Gusnard, D. A. & Shulman, G. L.",
            year: 2001,
            finding: "Découverte du réseau par défaut : un système de régions cérébrales qui s'active spécifiquement quand l'esprit divague, rumine ou projette dans le futur. Ce réseau consomme 60 à 80 % de l'énergie cérébrale totale et est directement lié à l'anxiété anticipatoire.",
            source: "Proceedings of the National Academy of Sciences, Université Washington de Saint-Louis",
          },
          {
            authors: "Kabat-Zinn, J., Massion, A. O., Kristeller, J., Peterson, L. G., Fletcher, K. E., Pbert, L., Lenderking, W. R. & Santorelli, S. F.",
            year: 1992,
            finding: "Un programme de 8 semaines de méditation de pleine conscience (MBSR) réduit l'anxiété de 38 % en moyenne chez des patients avec troubles anxieux généralisés, avec des effets maintenus à 3 mois de suivi.",
            source: "American Journal of Psychiatry, Université du Massachusetts",
          },
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
          {
            question: "Selon l'ACT de Hayes, où vit principalement l'anxiété ?",
            options: [
              "Dans le moment présent, toujours",
              "Dans le futur imaginé ou le passé remémoré",
              "Dans les sensations physiques uniquement",
              "Dans les pensées rationnelles",
            ],
            correct: 1,
            explanation: "Hayes souligne que l'anxiété habite rarement le présent réel, elle se nourrit de projections vers le futur («et si…») ou de ruminations sur le passé. La respiration consciente est un ancrage dans le seul moment qui existe vraiment.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Pendant les exercices de respiration, qu'as-tu remarqué dans ton corps et dans ton esprit ? As-tu réussi à observer tes sensations sans les combattre ? Qu'est-ce que «être dans le moment présent» a changé à ton expérience ?",
      },
    ],
  },

  {
    id: 3,
    title: 'Applied Tension',
    subtitle: 'La technique qui change tout',
    description: "Maîtrise la tension musculaire appliquée et la défusion cognitive, deux outils pour agir malgré la peur.",
    duration: '30 min',
    xpBonus: 100,
    badge: { id: 'module_3', label: 'Tension maîtrisée', icon: '💪' },
    exercises: [
      {
        type: 'reading',
        title: "La technique d'Öst & Sterner",
        content: "En 1987, les chercheurs Lars-Göran Öst et Ulf Sterner ont développé une technique révolutionnaire spécifiquement pour l'hémophobie : la tension musculaire appliquée, ou «Applied Tension».\n\nLeur découverte était simple mais fondamentale : si l'hémophobie provoque une chute de la pression artérielle, il suffit de l'augmenter intentionnellement pour contrer la réponse vasovagale. Et la façon la plus directe d'augmenter sa pression artérielle ? Contracter ses muscles.\n\nLe principe est le suivant : quand tu contractes tes muscles, bras, jambes, abdomen, pendant 10 à 15 secondes, tu comprimes les vaisseaux sanguins et tu forces le sang vers le cerveau. La pression artérielle monte. La syncope devient impossible.\n\nLes études d'Öst & Sterner ont montré que cette technique réduit significativement les évanouissements et l'anxiété anticipatoire chez les personnes hémophobes, même lors d'expositions à des stimuli intenses comme une prise de sang ou une chirurgie mineure.\n\nLa clé est la pratique régulière. En répétant ces cycles de tension-relâchement, tu entraînes ton corps à répondre automatiquement à la peur par une contraction musculaire protectrice, plutôt que par une chute de tension.",
        keyPoints: [
          "Technique développée par Öst & Sterner en 1987",
          "La contraction musculaire augmente la pression artérielle",
          "Elle contrecarre directement la réponse vasovagale",
          "5 séries de 10 secondes par groupe musculaire",
          "La pratique régulière crée une réponse automatique protectrice",
        ],
        sources: ['ost1989', 'wannemueller2018', 'foulds1990'],
        studies: [
          {
            authors: "Öst, L.-G., Fellenius, J. & Sterner, U.",
            year: 1991,
            finding: "Essai comparatif sur 30 patients hémophobes : la tension musculaire appliquée produit une amélioration chez 90 % des patients, contre 60 % pour la tension simple et 30 % pour la relaxation seule. Les gains sont maintenus à 1 an de suivi sans séance supplémentaire.",
            source: "Behaviour Research and Therapy, Université d'Uppsala, Suède",
          },
          {
            authors: "Ayala, E. S., Meuret, A. E. & Ritz, T.",
            year: 2009,
            finding: "Méta-analyse sur les traitements de l'hémophobie : la tension musculaire appliquée est la technique la plus efficace disponible, avec des effets maintenus jusqu'à 5 ans après la fin du traitement. L'amélioration médiane est de 85 % sur les symptômes principaux.",
            source: "Clinical Psychology Review",
          },
        ],
      },
      {
        type: 'reading',
        title: 'ACT : La défusion cognitive',
        content: "Il existe une différence fondamentale entre avoir une pensée et être fusionné avec elle. Steven Hayes appelle ce phénomène la «fusion cognitive» : quand une pensée nous semble tellement vraie et importante qu'elle dirige nos actions comme si elle était un fait réel.\n\nAvec l'hémophobie, la fusion ressemble à ceci : «Je suis quelqu'un qui ne peut pas voir du sang.» Cette phrase semble vraie. Elle semble faire partie de qui tu es. Et pourtant, c'est une pensée. Pas une vérité définitive.\n\nLa défusion cognitive, c'est l'art de prendre de la distance avec ses pensées. Hayes a développé une technique simple et puissante : au lieu de penser «Je vais m'évanouir», tu reformules en «Mon cerveau me dit que je vais m'évanouir». Cette nuance change tout. La pensée n'a plus le même poids. Elle devient observable, quelque chose que ton esprit produit, pas une réalité inéluctable.\n\nTu peux aussi nommer la pensée avec humour : «Ah, voilà mon esprit qui rejoue le vieux film du sang.» La distance créée par la défusion permet quelque chose d'essentiel : agir selon tes valeurs même quand ton esprit te crie de fuir. Les pensées catastrophiques peuvent être là, et tu peux quand même faire ce qui compte pour toi.",
        keyPoints: [
          "La fusion cognitive : prendre ses pensées pour des faits absolus",
          "La défusion : «Mon cerveau me dit que…» au lieu de «Je suis…»",
          "Nommer et observer ses pensées sans leur obéir automatiquement",
          "La défusion permet d'agir malgré les pensées anxieuses",
        ],
        studies: [
          {
            authors: "Masuda, A., Hayes, S. C., Sackett, C. F. & Twohig, M. P.",
            year: 2004,
            finding: "Des techniques simples de défusion cognitive, comme répéter un mot perturbant à voix haute pendant 30 secondes jusqu'à ce qu'il ne soit plus qu'un son, réduisent significativement la croyance accordée à une pensée négative et la détresse associée, en moins de 3 minutes.",
            source: "Behaviour Research and Therapy",
          },
          {
            authors: "Levin, M. E., Hildebrandt, M. J., Lillis, J. & Hayes, S. C.",
            year: 2012,
            finding: "Méta-analyse de 66 études : les techniques de défusion cognitive réduisent l'impact des pensées négatives indépendamment de leur contenu ou fréquence. La distanciation par rapport aux pensées prédit mieux l'amélioration clinique que la simple réduction de leur fréquence.",
            source: "Behavior Therapy",
          },
        ],
      },
      {
        type: 'applied_tension',
        title: 'Tension des bras',
        muscleGroup: 'bras',
        instruction: "Tends les deux bras devant toi, serre les poings et contracte tous les muscles de tes bras, avant-bras, biceps, épaules, aussi fort que tu le peux confortablement. Maintiens cette tension.",
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
        prompt: "Pendant les exercices de tension, quelles pensées ont traversé ton esprit ? Essaie de les reformuler en mode défusion : au lieu de «Je suis anxieux·se», écris «Mon cerveau me dit que…». Qu'est-ce que cette reformulation change pour toi ?",
      },
    ],
  },

  {
    id: 4,
    title: 'Exposition par les couleurs',
    subtitle: 'Du rose au rouge, en douceur',
    description: "Une exposition progressive aux teintes rouges, avec une leçon sur l'acceptation comme choix actif.",
    duration: '25 min',
    xpBonus: 100,
    badge: { id: 'module_4', label: 'Spectre maîtrisé', icon: '🎨' },
    exercises: [
      {
        type: 'reading',
        title: "L'exposition progressive : comment ça fonctionne",
        content: "L'exposition progressive est la pierre angulaire du traitement des phobies. Le principe est simple et scientifiquement validé : en t'exposant graduellement à ce qui te fait peur, dans un cadre sécurisé et avec les bons outils, ton système nerveux apprend que ce stimulus n'est pas dangereux.\n\nChaque exposition réussie envoie un message à ton cerveau : «Tu as survécu. Ce n'était pas une menace.» Au fil des répétitions, la réponse anxieuse diminue, c'est ce qu'on appelle l'habituation.\n\nNous allons commencer par les couleurs. Non pas parce que les couleurs sont dangereuses, bien sûr qu'elles ne le sont pas, mais parce que certaines teintes de rouge peuvent déclencher une réponse conditionnée chez les personnes hémophobes. En commençant par des roses très légers et en progressant vers des rouges plus profonds, tu entraînes ton cerveau à dissocier «rouge» de «danger».\n\nPendant chaque exposition, utilise la tension musculaire appliquée que tu as apprise. Contracte tes bras et tes jambes pendant que tu regardes la couleur. Cela maintient ta pression artérielle stable et renforce l'apprentissage positif.",
        keyPoints: [
          "L'exposition progressive habitue le système nerveux aux stimuli anxiogènes",
          "Chaque exposition réussie envoie un signal «pas de danger» au cerveau",
          "On part du plus doux pour aller vers le plus intense",
          "La tension musculaire doit être maintenue pendant toute l'exposition",
        ],
        sources: ['wolitzky2008'],
        studies: [
          {
            authors: "Wolpe, J.",
            year: 1958,
            finding: "Première démonstration clinique systématique de la désensibilisation progressive : sur 210 patients traités pour diverses phobies, 90 % montrent une amélioration significative, maintenue au suivi à long terme. C'est l'étude fondatrice de toute la thérapie d'exposition moderne.",
            source: "Psychotherapy by Reciprocal Inhibition, Stanford University Press",
          },
          {
            authors: "Craske, M. G., Kircanski, K., Zelikowsky, M., Mystkowski, J., Chowdhury, N. & Baker, A.",
            year: 2008,
            finding: "L'exposition efficace fonctionne non pas par simple habituation mais par apprentissage inhibiteur : le cerveau ne supprime pas la peur, il crée un nouveau souvenir concurrent qui dit «ce stimulus est sûr maintenant». Ce souvenir compétiteur explique pourquoi la pratique répétée est indispensable.",
            source: "Behaviour Research and Therapy, UCLA",
          },
        ],
      },
      {
        type: 'reading',
        title: "ACT : L'acceptation comme choix actif",
        content: "Il y a un malentendu fréquent sur le mot «acceptation». Accepter ne veut pas dire aimer, approuver, ou se résigner. Dans l'ACT de Hayes, l'acceptation est un acte de courage actif : choisir délibérément de faire de la place à une expérience difficile, parce que la fuir coûte trop cher.\n\nHayes utilise l'image d'un curseur de disponibilité. À zéro, tu fermes toutes les portes à l'inconfort : tu évites tout, tu fuis, tu t'organises autour de la peur. À dix, tu t'ouvres complètement à l'expérience, quelle qu'elle soit. La question n'est pas : comment atteindre zéro inconfort ? Mais : jusqu'où je suis prêt·e à ouvrir ce curseur, en échange de vivre la vie que je veux vraiment ?\n\nC'est exactement ce que tu fais dans cet exercice. En regardant ces couleurs tout en maintenant la tension musculaire, tu pratiques une forme d'acceptation active. Tu dis : «Cette sensation peut être là. Je ne m'y oppose pas. Je ne la fuis pas. Et je continue quand même.»\n\nLe paradoxe central de l'ACT est le suivant : quand on arrête de se battre contre l'inconfort, il occupe souvent moins de place. Non pas parce qu'on l'a éliminé, mais parce qu'on a cessé de lui donner toute notre énergie.",
        keyPoints: [
          "L'acceptation n'est pas résignation : c'est choisir de faire de la place à l'inconfort",
          "Le curseur de disponibilité : jusqu'où je m'ouvre à l'expérience ?",
          "Arrêter de se battre contre l'inconfort lui enlève une partie de son pouvoir",
          "Regarder ces couleurs = pratiquer l'acceptation active",
        ],
        studies: [
          {
            authors: "Levitt, J. T., Brown, T. A., Orsillo, S. M. & Barlow, D. H.",
            year: 2004,
            finding: "Pendant des inducements d'anxiété en laboratoire, les participants instruits d'accepter leurs sensations tolèrent significativement mieux l'inconfort et montrent moins de comportements d'évitement que ceux instruits de supprimer ou de contrôler leurs émotions.",
            source: "Behavior Therapy, Université de Boston",
          },
          {
            authors: "Hayes, S. C., Luoma, J. B., Bond, F. W., Masuda, A. & Lillis, J.",
            year: 2006,
            finding: "Méta-analyse de 13 essais contrôlés randomisés sur la thérapie ACT : supérieure aux listes d'attente dans tous les cas, et au moins aussi efficace que les thérapies cognitivo-comportementales classiques, avec une flexibilité psychologique accrue comme mécanisme d'action principal.",
            source: "Behavior Therapy",
          },
        ],
      },
      {
        type: 'color_exposure',
        colors: [
          { hex: '#FFE8E8', label: 'Rose très pâle : observe simplement cette teinte, sans jugement' },
          { hex: '#FFCCCC', label: 'Rose clair : remarque ce qui se passe en toi, accueille-le' },
          { hex: '#FF8888', label: 'Rose soutenu : reste présent·e, tu fais de la place à cette couleur' },
          { hex: '#EE3344', label: 'Rouge vif : tu choisis de regarder, c\'est un acte courageux' },
          { hex: '#CC0022', label: 'Rouge profond : tu as traversé tout le spectre en restant là' },
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
          {
            question: "Dans l'ACT de Hayes, qu'est-ce que l'acceptation signifie vraiment ?",
            options: [
              "Aimer et approuver ses émotions difficiles",
              "Se résigner à vivre avec la peur pour toujours",
              "Choisir activement de faire de la place à l'inconfort sans le fuir",
              "Ignorer ses sensations physiques",
            ],
            correct: 2,
            explanation: "L'acceptation ACT est un acte actif et courageux : choisir de s'ouvrir à l'expérience difficile parce que la fuir coûte trop cher en termes de vie vécue. Ce n'est ni de la résignation, ni de l'approbation.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Pendant l'exposition aux couleurs, sur combien aurais-tu mis ton «curseur de disponibilité» (0 = fermeture totale, 10 = ouverture complète) ? Qu'est-ce qui t'aiderait à l'ouvrir un peu plus ? Et qu'est-ce que tu pourrais faire dans ta vie si ce curseur était plus haut ?",
      },
    ],
  },

  {
    id: 5,
    title: 'Exposition par les formes',
    subtitle: 'Des formes abstraites, pas de contexte',
    description: "Quatre formes évocatrices, et la découverte du soi observateur qui regarde sans être emporté.",
    duration: '25 min',
    xpBonus: 100,
    badge: { id: 'module_5', label: 'Formes apprivoisées', icon: '⬟' },
    exercises: [
      {
        type: 'reading',
        title: 'La puissance des formes abstraites',
        content: "Notre cerveau est une machine à reconnaître des patterns. Avant même que nous ayons identifié consciemment un objet, notre cortex visuel a déjà analysé ses formes, ses contours et ses couleurs. C'est pour cela que certaines formes peuvent déclencher une réponse émotionnelle instantanée.\n\nLes formes que tu vas observer dans ce module sont abstraites, elles ne représentent rien de réel. Pourtant, leur aspect pourrait évoquer quelque chose. C'est précisément le but : t'habituer à ces associations visuelles dans un cadre entièrement sécurisé, sans aucun contenu choquant.\n\nEn regardant ces formes tout en maintenant la tension musculaire, tu entraînes ton cerveau à dissocier «formes évocatrices» de «danger imminent». C'est une étape essentielle avant d'aborder des représentations plus concrètes.\n\nPrends ton temps avec chaque forme. Observe-la vraiment. Remarque les détails, les contours, les variations. Plus tu la regardes attentivement, plus l'exposition est efficace.",
        keyPoints: [
          "Le cerveau reconnaît les formes avant même la conscience claire",
          "Les formes abstraites permettent une exposition sans contenu choquant",
          "Observer attentivement renforce l'effet d'habituation",
          "La tension musculaire doit accompagner chaque observation",
        ],
        studies: [
          {
            authors: "Öhman, A., Flykt, A. & Esteves, F.",
            year: 2001,
            finding: "Le cerveau détecte des formes potentiellement menaçantes en 50 à 100 millisecondes, avant la conscience visuelle. L'amygdale s'active face à des motifs abstraits évoquant une menace avant même que le cortex préfrontal n'ait identifié l'objet. L'exposition répétée à ces formes en sécurité désactive progressivement cette réponse automatique.",
            source: "Journal of Experimental Psychology: General, Université de Stockholm",
          },
        ],
      },
      {
        type: 'reading',
        title: 'ACT : Le soi observateur',
        content: "Il y a en toi quelque chose qui regarde. Quand tu ressens de l'anxiété, il y a l'anxiété, et il y a aussi celui ou celle qui la remarque. Cette distinction est au cœur de l'un des concepts les plus puissants de Steven Hayes : le soi comme contexte, ou «soi observateur».\n\nHayes propose une métaphore : imagine que tu es le ciel. Les pensées, les émotions, les sensations, toutes ces expériences sont comme la météo. Nuages, tempêtes, soleil, brouillard. La météo change tout le temps. Mais le ciel, lui, est toujours là, plus vaste que n'importe quelle tempête. Il peut contenir toutes les météos sans en être détruit.\n\nTu n'es pas ton anxiété. Tu n'es pas ta peur du sang. Tu es le ciel qui observe cette peur traverser ton expérience. Cette perspective change fondamentalement la relation à l'inconfort : si tu ES ta peur, elle est menaçante. Si tu OBSERVES ta peur depuis un endroit stable en toi, elle devient un nuage parmi d'autres.\n\nDans les exercices qui suivent, pratique ceci : en observant chaque forme, remarque que tu es l'observateur·trice. La forme produit peut-être une réaction. Et toi, tu regards cette réaction depuis un endroit stable. Tu n'es pas emporté·e. Tu es le ciel.",
        keyPoints: [
          "Le soi observateur : il y a toujours quelque chose en toi qui remarque l'expérience",
          "Métaphore du ciel : tu es le ciel, les émotions sont la météo",
          "Tu n'es pas ton anxiété, tu OBSERVES ton anxiété",
          "Cette perspective crée de l'espace entre toi et l'expérience difficile",
        ],
        studies: [
          {
            authors: "Luciano, C., Ruiz, F. J., Torres, R. M. V., Martín, V. S., Martínez, O. G. & López, J. C. L.",
            year: 2011,
            finding: "L'entraînement spécifique au soi comme contexte réduit significativement la fusion cognitive et augmente la flexibilité psychologique, mesurée par le questionnaire AAQ (Acceptance and Action Questionnaire). Les effets sont distincts de ceux obtenus par la défusion cognitive seule.",
            source: "The Psychological Record",
          },
          {
            authors: "Öhman, A., Flykt, A. & Esteves, F.",
            year: 2001,
            finding: "Le cerveau détecte des stimuli potentiellement menaçants en 50 à 100 millisecondes, avant même la conscience visuelle. L'amygdale s'active face à des formes abstraites évoquant une menace avant que le cortex n'ait identifié l'objet. La position d'observateur neutralise cette réponse en activant le cortex préfrontal.",
            source: "Journal of Experimental Psychology: General, Université de Stockholm",
          },
        ],
      },
      {
        type: 'shape_exposure',
        shapes: [
          { label: 'Cercle : observe depuis le soi ciel, laisse la réaction être là', variant: 'circle' },
          { label: 'Goutte : tu es l\'observateur·trice, pas la réaction', variant: 'drop' },
          { label: 'Éclaboussure : remarque ce qui se passe sans en être emporté·e', variant: 'splatter' },
          { label: 'Forme complexe : tu es le ciel. Cette forme est de la météo.', variant: 'complex' },
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Que représente la métaphore du «ciel et de la météo» dans l'ACT de Hayes ?",
            options: [
              "Le ciel = les pensées positives, la météo = les pensées négatives",
              "Le ciel = le soi observateur stable, la météo = les pensées et émotions changeantes",
              "Le ciel = l'objectif thérapeutique, la météo = les obstacles",
              "Cette métaphore concerne uniquement la méditation",
            ],
            correct: 1,
            explanation: "Dans l'ACT, le ciel représente le soi observateur, stable, vaste, capable de contenir n'importe quelle expérience. La météo représente les pensées, émotions et sensations changeantes. Tu es le ciel, pas les nuages.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "As-tu réussi à te placer en position d'observateur·trice pendant l'exposition aux formes ? Décris ce que tu as remarqué depuis cette perspective de «ciel». Qu'est-ce qui change quand tu te rappelles que tu n'es pas ta peur, mais celui ou celle qui l'observe ?",
      },
    ],
  },

  {
    id: 6,
    title: 'Exposition par les images',
    subtitle: 'Du plus abstrait au plus concret',
    description: "Trois niveaux d'images progressives, et la clarification de ce qui compte vraiment pour toi.",
    duration: '30 min',
    xpBonus: 100,
    badge: { id: 'module_6', label: 'Regard posé', icon: '👁️' },
    exercises: [
      {
        type: 'reading',
        title: 'Préparer ton regard',
        content: "Tu arrives à une étape importante de ton parcours. Jusqu'ici, tu as travaillé avec des couleurs et des formes abstraites. Dans ce module, tu vas progresser vers des représentations visuelles plus concrètes, organisées en trois niveaux d'intensité croissante.\n\nLe niveau 1 est une composition artistique abstraite utilisant des teintes rouges. Elle n'est pas réaliste, mais elle mobilise tes associations visuelles de manière plus directe que les exercices précédents.\n\nLe niveau 2 est un schéma médical stylisé, le type d'illustration qu'on trouve dans les manuels médicaux ou les applications de santé. Reconnaissable mais épuré.\n\nLe niveau 3 est une représentation médicale plus réaliste, similaire à ce qu'on pourrait voir dans un contexte médical réel. C'est le niveau le plus intense de ce module.\n\nAvant chaque image, commence par contracter tes muscles. Maintiens la tension pendant que tu regardes. Respire normalement. Si tu ressens le besoin de t'arrêter, c'est tout à fait acceptable, reprends quand tu es prêt·e. Il n'y a aucune urgence.",
        keyPoints: [
          "Trois niveaux progressifs : abstrait, schéma médical, représentation réaliste",
          "Contracter les muscles AVANT de regarder chaque image",
          "Maintenir la tension pendant toute l'observation",
          "Il est normal de ressentir une légère anxiété : c'est le signe que l'exposition fonctionne",
        ],
        studies: [
          {
            authors: "Fyer, A. J.",
            year: 1998,
            finding: "L'exposition progressive en session unique intensive (une à deux heures) donne des résultats comparables à plusieurs semaines de thérapie hebdomadaire pour les phobies spécifiques. La clé est la durée suffisante pour que l'anxiété redescende naturellement pendant la session.",
            source: "Depression and Anxiety, Columbia University",
          },
          {
            authors: "Zlomke, K. & Davis, T. E.",
            year: 2008,
            finding: "Méta-analyse sur les traitements des phobies spécifiques : l'exposition en une seule session est aussi efficace que les traitements multi-sessions pour 80 % des cas, avec une satisfaction patient plus élevée liée à la brièveté du traitement.",
            source: "Behavior Therapy",
          },
        ],
      },
      {
        type: 'reading',
        title: 'ACT : Tes valeurs comme boussole',
        content: "Steven Hayes pose une question qui peut sembler simple mais qui est en réalité profonde : pourquoi veux-tu surmonter ta peur du sang ? Pas «parce que c'est gênant», mais vraiment : qu'est-ce qui devient possible dans ta vie si cette peur cesse de te limiter ?\n\nDans l'ACT, les valeurs ne sont pas des objectifs. Un objectif peut être atteint et coché. Une valeur, elle, est une direction, quelque chose vers quoi tu marches, et qui donne un sens à chaque pas. «Être un parent présent», «prendre soin des gens que j'aime», «vivre sans honte de mon corps» : ce sont des valeurs. Elles ne s'atteignent pas, elles se vivent.\n\nPourquoi est-ce important ici ? Parce que l'acceptation de l'inconfort n'a de sens que si elle est au service de quelque chose qui compte vraiment pour toi. Regarder ces images difficiles n'est pas une performance à réussir. C'est un acte en direction de la vie que tu veux mener.\n\nPeut-être que tu veux pouvoir accompagner ton enfant chez le médecin sans paniquer. Peut-être que tu veux arrêter d'éviter les films ou les conversations. Peut-être que tu veux juste ne plus avoir honte. Quelle que soit ta réponse, c'est elle, ta boussole. Garde-la en tête pendant les expositions qui suivent.",
        keyPoints: [
          "Les valeurs ACT = une direction de vie, pas un objectif à cocher",
          "L'acceptation de l'inconfort a du sens quand elle sert ce qui compte vraiment",
          "Chaque exposition est un pas vers la vie que tu veux, pas une performance",
          "Identifier son «pourquoi» renforce la motivation face à l'inconfort",
        ],
        studies: [
          {
            authors: "Wilson, K. G. & Murrell, A. R.",
            year: 2004,
            finding: "La clarification des valeurs personnelles augmente significativement la tolérance à l'inconfort et la disposition à s'engager dans des comportements difficiles mais alignés avec ses objectifs de vie. Les patients dont les valeurs sont clarifiées montrent une meilleure adhésion aux exercices d'exposition.",
            source: "Hayes, Follette & Linehan (Eds.), Mindfulness and Acceptance, Guilford Press",
          },
          {
            authors: "Michelson, S. E., Lee, J. K., Orsillo, S. M. & Roemer, L.",
            year: 2011,
            finding: "Le fait d'agir en accord avec ses valeurs, même en présence d'anxiété, prédit mieux la réduction des symptômes à long terme que la réduction de l'anxiété elle-même. L'engagement vers ce qui compte protège contre les rechutes.",
            source: "Cognitive Behaviour Therapy",
          },
        ],
      },
      {
        type: 'image_exposure',
        level: 1,
        title: 'Niveau 1 : Composition abstraite',
        description: "Une composition artistique en teintes rouges. Observe les formes et les dégradés depuis ta position de soi observateur. Rappelle-toi ton «pourquoi».",
      },
      {
        type: 'image_exposure',
        level: 2,
        title: 'Niveau 2 : Schéma médical',
        description: "Un schéma stylisé de type médical. Contracte tes muscles, reste présent·e. Tu fais ceci pour quelque chose qui compte.",
      },
      {
        type: 'image_exposure',
        level: 3,
        title: 'Niveau 3 : Représentation médicale',
        description: "Une représentation plus réaliste dans un contexte médical. Tu as tous les outils. Tu sais pourquoi tu es là. Reste dans le moment présent.",
      },
      {
        type: 'journal',
        prompt: "Écris ta réponse à cette question : pourquoi veux-tu vraiment surmonter ta peur du sang ? Qu'est-ce qui devient possible dans ta vie concrète ? Pense à au moins une situation précise, une personne, un lieu, un moment, que cette peur t'empêche de vivre pleinement aujourd'hui.",
      },
    ],
  },

  {
    id: 7,
    title: 'Maîtrise totale',
    subtitle: 'Prêt·e pour la vraie vie',
    description: "Des scénarios réels, la synthèse ACT complète, et l'engagement vers la vie que tu veux.",
    duration: '35 min',
    xpBonus: 150,
    badge: { id: 'module_7', label: 'Maître absolu', icon: '🏆' },
    exercises: [
      {
        type: 'reading',
        title: 'De la théorie à la pratique',
        content: "Tu as parcouru un long chemin. Tu comprends les mécanismes de ta peur, tu maîtrises deux techniques de respiration, tu pratiques la tension musculaire appliquée, et tu as traversé des expositions visuelles progressives.\n\nCe dernier module est celui de l'intégration. Ici, tu vas appliquer toutes ces compétences dans des scénarios de la vie réelle, les situations que tu redoutais peut-être avant de commencer ce programme.\n\nLa clé de la maîtrise, ce n'est pas l'absence totale de peur. C'est la capacité à agir malgré la peur, avec des outils concrets pour la gérer. La plupart des personnes qui terminent ce programme ne deviennent pas insensibles au sang : elles deviennent capables de faire face à une prise de sang, d'accompagner un proche blessé, de regarder une scène médicale à la télévision, sans être dépassées.\n\nLis chaque scénario attentivement. Visualise-toi en train de traverser les étapes. Ressens ce que tu ressentirais, et remarque que tu as maintenant les outils pour gérer ça.\n\nTu n'es plus la même personne qu'au début de ce programme.",
        keyPoints: [
          "La maîtrise = agir avec ses outils malgré la peur, pas l'absence de peur",
          "Les outils acquis : compréhension, respiration, tension musculaire, habituations",
          "Les scénarios permettent de répéter mentalement avant la situation réelle",
          "La visualisation renforce les connexions neuronales protectrices",
        ],
        studies: [
          {
            authors: "Driskell, J. E., Copper, C. & Moran, A.",
            year: 1994,
            finding: "Méta-analyse sur 35 études : la répétition mentale (visualisation d'une action sans l'exécuter physiquement) produit 67 % des gains obtenus par la pratique physique réelle, et améliore significativement la performance quand elle est combinée avec la pratique. Le cerveau ne distingue pas totalement l'imaginé du vécu.",
            source: "Journal of Applied Psychology",
          },
          {
            authors: "Bandura, A.",
            year: 1977,
            finding: "La théorie du sentiment d'auto-efficacité montre que se voir réussir une action augmente la probabilité de la réussir réellement, en modifiant les attentes du cerveau sur ce qui est possible. La visualisation de succès modifie les représentations neuronales de la situation anxiogène.",
            source: "Psychological Review, Stanford University",
          },
        ],
      },
      {
        type: 'reading',
        title: 'ACT : L\'action engagée, la synthèse',
        content: "Tu es arrivé·e au sixième et dernier processus de l'ACT de Steven Hayes : l'action engagée. C'est le moment où tout se rassemble.\n\nAu fil de ce programme, tu as exploré les six piliers du modèle ACT, ce que Hayes appelle l'hexaflex de la flexibilité psychologique. Tu as appris à reconnaître le piège du contrôle (module 1). Tu as pratiqué le moment présent comme ancre (module 2). Tu as découvert la défusion cognitive, voir tes pensées comme des pensées, pas comme des faits (module 3). Tu as choisi l'acceptation active face à l'inconfort (module 4). Tu as habité le soi observateur, ce ciel stable en toi (module 5). Tu as clarifié tes valeurs, ta boussole intérieure (module 6).\n\nL'action engagée, c'est la mise en mouvement de tout cela. Hayes la définit ainsi : prendre des pas concrets, délibérés et répétés en direction de ses valeurs, même quand l'esprit dit «attends d'être prêt·e». Parce que l'esprit dira toujours «pas encore». La vraie liberté ne vient pas de l'absence de peur. Elle vient de la capacité à avancer malgré elle, avec elle, en la tenant sans en être tenu·e.\n\nDans quelques instants, tu vas traverser des scénarios réels. Ce ne sont pas des tests. Ce sont des pratiques d'action engagée. Chaque pas que tu feras, tu le feras parce qu'il t'amène vers la vie que tu veux vraiment mener.",
        keyPoints: [
          "L'hexaflex ACT complet : contrôle, présent, défusion, acceptation, soi observateur, valeurs",
          "L'action engagée = avancer vers ses valeurs même sans se sentir prêt·e",
          "L'esprit dira toujours «pas encore» : agir malgré lui, c'est la liberté",
          "Tu tiens ta peur sans en être tenu·e, c'est la flexibilité psychologique",
        ],
        studies: [
          {
            authors: "Hayes, S. C., Luoma, J. B., Bond, F. W., Masuda, A. & Lillis, J.",
            year: 2006,
            finding: "Méta-analyse de 13 essais randomisés sur l'ACT : la thérapie est efficace sur un spectre très large de troubles, de l'anxiété aux douleurs chroniques en passant par les addictions. Le mécanisme commun est la flexibilité psychologique, la capacité à agir en accord avec ses valeurs même en présence d'émotions difficiles.",
            source: "Behavior Therapy",
          },
          {
            authors: "A-Tjak, J. G. L. et al.",
            year: 2015,
            finding: "Méta-analyse de 39 essais randomisés contrôlés : l'ACT produit des améliorations cliniquement significatives comparées aux conditions contrôle, avec une taille d'effet moyenne de 0,65, ce qui la place dans la catégorie des traitements à fort niveau de preuve.",
            source: "Psychotherapy and Psychosomatics",
          },
        ],
      },
      {
        type: 'scenario',
        title: 'Scénario 1 : La prise de sang',
        situation: "Tu arrives à un laboratoire d'analyses médicales pour une prise de sang prescrite par ton médecin. La salle d'attente est calme. Une infirmière t'appelle.",
        steps: [
          {
            instruction: "En t'asseyant dans la salle d'attente, tu remarques une montée d'anxiété. Au lieu de la combattre, tu l'observes depuis ton soi ciel : «Mon cerveau me dit que c'est dangereux.» Puis tu contractes discrètement les muscles de tes jambes.",
            tip: "Défusion + tension musculaire combinées : nommer la pensée ('mon cerveau me dit…') réduit son emprise, et la tension protège ta pression artérielle.",
          },
          {
            instruction: "L'infirmière t'appelle. En marchant vers la salle, tu enchaînes deux cycles de respiration 4-7-8. Tu es dans ce couloir, maintenant. Pas dans la catastrophe imaginée, ici, maintenant.",
            tip: "Le moment présent comme ancre : tu marches dans un couloir. C'est tout ce qui est réel maintenant.",
          },
          {
            instruction: "Avant d'entrer dans la salle, tu t'arrêtes et tu parles à l'infirmière : «J'ai une phobie du sang, je risque de faire un malaise. Est-ce que je peux faire la prise de sang allongé·e ?» L'infirmière acquiesce et t'installe sur la table d'examen.",
            tip: "Demander à t'allonger n'est pas fuir : allongé·e, la chute de pression artérielle ne peut pas provoquer d'évanouissement. C'est une adaptation intelligente, validée médicalement. Le personnel soignant connaît cette demande et y répond positivement.",
          },
          {
            instruction: "Allongé·e sur la table, l'infirmière prépare son matériel. Tu contractes les deux bras et les deux jambes simultanément. Tu rappelles ton «pourquoi», la raison pour laquelle tu as choisi d'être là aujourd'hui.",
            tip: "L'action engagée : tu es là parce que c'est en accord avec ce qui compte pour toi. Chaque seconde passée là est un acte de liberté.",
          },
          {
            instruction: "C'est terminé. L'infirmière applique un coton. Tu relâches la tension musculaire. Tu respires. Tu remarques : tu es encore là. Le soi observateur a tout vu. Et il est intact.",
            tip: "Après chaque exposition, prends un moment pour reconnaître ce que tu viens d'accomplir. Pas par performance, par honnêteté envers toi-même.",
          },
        ],
      },
      {
        type: 'scenario',
        title: "Scénario 2 : Accompagner quelqu'un de blessé",
        situation: "Un ami s'est blessé à la main en cuisinant. Il saigne et a besoin de ton aide pour désinfecter et bander la plaie.",
        steps: [
          {
            instruction: "Tu entends ton ami crier depuis la cuisine. Une pensée surgit immédiatement. Tu la nommes : «Mon cerveau me dit que je ne peux pas gérer ça.» Puis tu contractes immédiatement tes bras et tes jambes, avant même d'avoir vu quoi que ce soit.",
            tip: "La tension musculaire préventive est plus efficace que la tension réactive. Et la défusion t'empêche d'obéir à la pensée catastrophique avant même d'avoir essayé.",
          },
          {
            instruction: "Tu évalues la situation : la blessure n'est pas profonde. Tu lui demandes de presser un tissu propre sur sa main. Tu prends trois respirations profondes, tu reviens au moment présent. Ton ami a besoin de toi maintenant.",
            tip: "Tes valeurs te disent quoi faire : prendre soin des gens que tu aimes. L'action engagée, c'est de répondre à ça, pas à la peur.",
          },
          {
            instruction: "Tu ouvres la trousse de premiers secours. Tu maintiens la tension dans tes jambes pendant que tes mains travaillent. Tu te rappelles que tu es le ciel, la peur est de la météo, pas toi.",
            tip: "Soi observateur en action : tu remarques l'inconfort, tu ne l'es pas. Tes mains peuvent agir pendant que la peur est là, à côté.",
          },
          {
            instruction: "Tu appliques le désinfectant, poses la compresse, fixes le bandage. Ton ami te remercie. Tu relâches la tension, tu respires. Tu viens de vivre ta valeur, être là pour quelqu'un, malgré tout ce que ton esprit disait.",
            tip: "C'est ça, la flexibilité psychologique selon Hayes : pas l'absence de peur, mais la capacité à agir selon tes valeurs même quand la peur est présente.",
          },
        ],
      },
      {
        type: 'quiz',
        questions: [
          {
            question: "Dans un scénario réel, quand faut-il commencer la tension musculaire ?",
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
            question: "Qu'est-ce que l'«action engagée» dans l'ACT de Hayes ?",
            options: [
              "Agir seulement quand on n'a plus peur",
              "Prendre des pas vers ses valeurs même quand l'esprit dit «pas encore»",
              "Accomplir des performances pour prouver sa guérison",
              "Attendre que la thérapie soit totalement terminée avant d'agir",
            ],
            correct: 1,
            explanation: "L'action engagée selon Hayes, c'est avancer vers ce qui compte pour soi, délibérément et de façon répétée, même en présence de l'inconfort. L'esprit dira toujours «attends d'être prêt·e». La liberté commence quand on avance malgré lui.",
          },
          {
            question: "Combien de processus composent l'hexaflex de la flexibilité psychologique selon l'ACT ?",
            options: ["3", "4", "6", "8"],
            correct: 2,
            explanation: "L'ACT repose sur 6 processus : le contact avec le moment présent, l'acceptation, la défusion cognitive, le soi comme contexte (observateur), la clarification des valeurs, et l'action engagée. Ensemble, ils forment l'hexaflex de la flexibilité psychologique.",
          },
        ],
      },
      {
        type: 'journal',
        prompt: "Tu as terminé le programme complet : thérapie d'exposition ET ACT. Réponds à ces trois questions : (1) Qu'est-ce que tu as appris sur ta relation à la peur ? (2) Quelle situation concrète dans ta vie est maintenant différente ou le sera bientôt ? (3) Quelle valeur ce programme t'a aidé à mieux honorer ?",
      },
    ],
  },
]
