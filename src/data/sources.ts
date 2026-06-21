export interface Source {
  id: string
  theme: string
  citation: string
  finding: string
  n?: number
}

export const SOURCES: Source[] = [
  {
    id: 'bienvenu1998',
    theme: 'Épidémiologie',
    citation: 'Bienvenu, O. J., & Eaton, W. W. (1998). The epidemiology of blood-injection-injury phobia. Psychological Medicine, 28(5), 1129-1136.',
    finding: "Sur 1 920 personnes interrogées, 3,5 % ont eu une phobie du sang au cours de leur vie (jusqu'à 4,9 % chez les femmes). L'âge médian d'apparition est 5,5 ans, et 78 % avaient encore des symptômes dans les 6 derniers mois. 75 % rapportent un antécédent d'évanouissement - unique parmi toutes les phobies spécifiques.",
    n: 1920,
  },
  {
    id: 'graham1961',
    theme: 'Mécanisme physiologique',
    citation: 'Graham, D. T., Kabler, J. D., & Lunsford, L. (1961). Vasovagal fainting: a diphasic response. Psychosomatic Medicine, 23(6), 493-507.',
    finding: "Première description scientifique de la réponse vasovagale en deux temps : d'abord une accélération cardiaque, puis une chute brutale de tension artérielle. Ce mécanisme est la base physiologique de tout le programme de désensibilisation.",
  },
  {
    id: 'foulds1990',
    theme: 'Mécanisme physiologique',
    citation: 'Foulds, J., Wiedmann, K., Patterson, J., & Brooks, N. (1990). The effects of muscle tension on cerebral circulation in blood-phobic and non-phobic subjects. Behaviour Research and Therapy, 28(6), 481-486.',
    finding: "Preuve directe que la contraction musculaire modifie la circulation cérébrale chez les personnes phobiques du sang. C'est le mécanisme exact ciblé par la tension musculaire appliquée : maintenir la pression pour éviter l'évanouissement.",
  },
  {
    id: 'ost1989',
    theme: 'Tension musculaire appliquée',
    citation: 'Öst, L.-G., Sterner, U., & Fellenius, J. (1989). Applied tension, applied relaxation, and the combination in the treatment of blood phobia. Behaviour Research and Therapy, 27(2), 109-121.',
    finding: "30 patients traités par tension appliquée, relaxation appliquée, ou la combinaison. 73 % cliniquement améliorés en fin de traitement, 77 % au suivi à 6 mois. La tension appliquée est la seule technique qui agit directement sur la chute de pression artérielle.",
    n: 30,
  },
  {
    id: 'wannemueller2018',
    theme: 'Tension musculaire appliquée',
    citation: 'Wannemueller, A., Fasbender, A., Kampmann, Z., Weiser, K., Schaumburg, S., Velten, J., & Margraf, J. (2018). Large-group one-session treatment: a feasibility study of exposure combined with applied tension or diaphragmatic breathing in highly blood-injury-injection fearful individuals. Frontiers in Psychology, 9, 1534.',
    finding: "40 participants très craintifs du sang traités en groupe sur une seule session. 70 % ont réussi une vraie prise de sang après traitement, avec une amélioration encore plus marquée à 7 mois de suivi (taille d'effet d = 1,19 à 1,62).",
    n: 40,
  },
  {
    id: 'wolitzky2008',
    theme: 'Exposition graduée',
    citation: 'Wolitzky-Taylor, K. B., Horowitz, J. D., Powers, M. B., & Telch, M. J. (2008). Psychological approaches in the treatment of specific phobias: A meta-analysis. Clinical Psychology Review, 28(6), 1021-1037.',
    finding: "Méta-analyse de 33 essais randomisés : les traitements par exposition sont supérieurs à toutes les autres approches pour les phobies spécifiques. Les protocoles multi-séances obtiennent une amélioration légèrement supérieure à la séance unique, mais l'écart reste modeste - la gradualité compte plus que la durée.",
    n: 33,
  },
  {
    id: 'you2021',
    theme: 'Respiration',
    citation: 'You, M., Laborde, S., Zammit, N., Iskra, M., Borges, U., & Dosseville, F. (2021). Single slow-paced breathing session at six cycles per minute: investigation of dose-response relationship on cardiac vagal activity. International Journal of Environmental Research and Public Health, 18(23), 12478.',
    finding: "59 participants. Une seule séance de respiration lente à 6 cycles par minute (5s inspire / 5s expire) augmente l'activité vagale cardiaque, quelle que soit sa durée de 5 à 20 minutes - c'est la base de la cohérence cardiaque du module 2.",
    n: 59,
  },
  {
    id: 'laborde2022',
    theme: 'Respiration',
    citation: 'Laborde, S., Allen, M. S., Borges, U., Iskra, M., Zammit, N., You, M., Hosang, T., Mosley, E., & Dosseville, F. (2022). Psychophysiological effects of slow-paced breathing at six cycles per minute with or without heart rate variability biofeedback. Psychophysiology, 59(3), e13952.',
    finding: "Une séance courte de 5 minutes de respiration lente suffit à augmenter l'activité vagale, même sans dispositif de biofeedback. Confirme qu'un exercice simple sans équipement fonctionne pleinement.",
  },
  {
    id: 'aktas2023',
    theme: 'Respiration',
    citation: 'Aktaş, G. K., & İlgin, V. E. (2023). The effect of deep breathing exercise and 4-7-8 breathing techniques applied to patients after bariatric surgery on anxiety and quality of life. Obesity Surgery, 33(3), 920-929.',
    finding: "Essai randomisé sur 90 patients (30 par groupe). Le groupe 4-7-8 présente un niveau d'anxiété significativement plus bas que les groupes respiration profonde classique et contrôle, en contexte médical post-opératoire.",
    n: 90,
  },
  {
    id: 'atjak2015',
    theme: 'ACT (Acceptance and Commitment Therapy)',
    citation: "A-Tjak, J. G. L., Davis, M. L., Morina, N., Powers, M. B., Smits, J. A. J., & Emmelkamp, P. M. G. (2015). A meta-analysis of the efficacy of acceptance and commitment therapy for clinically relevant mental and physical health problems. Psychotherapy and Psychosomatics, 84(1), 30-36.",
    finding: "Méta-analyse de 39 essais randomisés, 1 821 patients. Taille d'effet de 0,57 contre les groupes contrôle. Pas de différence significative avec la TCC classique (d = 0,16). La valeur de l'ACT dans ce programme est sur l'adhésion et le vécu subjectif du parcours, pas la suppression des symptômes.",
    n: 1821,
  },
]

export function getSource(id: string): Source | undefined {
  return SOURCES.find(s => s.id === id)
}

export function sourcesByTheme(): Record<string, Source[]> {
  return SOURCES.reduce((acc, s) => {
    ;(acc[s.theme] ??= []).push(s)
    return acc
  }, {} as Record<string, Source[]>)
}
