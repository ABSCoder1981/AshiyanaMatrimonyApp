/* ════════════════════════════════════════════════════════════
   Nikah Platform — Profile Form (3 parts, EN/HI bilingual)
   ════════════════════════════════════════════════════════════ */
'use strict';

const $ = id => document.getElementById(id);
let LANG = 'en';

/* ── Static UI strings ── */
const T = {
  brandTitle:{en:'Nikah Platform',hi:'निकाह प्लेटफ़ॉर्म'},
  brandSub:{en:'Profile Form',hi:'प्रोफ़ाइल फ़ॉर्म'},
  progressLabel:{en:'Profile completion',hi:'प्रोफ़ाइल कितनी पूरी हुई'},
  btnSaveExit:{en:'💾 Save & continue later',hi:'💾 सेव करें और बाद में जारी रखें'},
  savedToast:{en:'✓ Progress saved on this device.',hi:'✓ आपकी प्रोग्रेस इस डिवाइस पर सेव हो गई।'},
  resumedToast:{en:'Welcome back — resumed your saved progress.',hi:'वापस आए — आपकी सेव की हुई प्रोग्रेस से जारी है।'},
  p1Title:{en:'About You',hi:'आपके बारे में'},
  p2Title:{en:'Partner Sought',hi:'पसंदीदा साथी'},
  p3Title:{en:'Religious Preferences',hi:'दीनी पसंद'},
  secPersonal:{en:'Personal Details',hi:'निजी जानकारी'},
  secReligious:{en:'Religious Identity',hi:'दीनी पहचान'},
  secCareer:{en:'Career & Education',hi:'करियर और तालीम'},
  secLocation:{en:'Location',hi:'रहने की जगह'},
  secBackground:{en:'Background',hi:'पृष्ठभूमि'},
  secIntentions:{en:'Marriage Intentions',hi:'निकाह की सोच'},
  secBasicPref:{en:'Basic Preferences',hi:'बुनियादी पसंद'},
  secHistory:{en:'History & Background',hi:'पिछली जानकारी'},
  secLocationLiving:{en:'Location & Living',hi:'जगह और रहन-सहन'},
  secFuturePlans:{en:'Future Plans',hi:'आगे की सोच'},
  secPracticeBeliefs:{en:'Section A — Practice & Beliefs',hi:'हिस्सा A — अमल और अक़ीदा'},
  secLifestyleBoundaries:{en:'Section B — Lifestyle & Boundaries',hi:'हिस्सा B — ज़िंदगी और हदें'},
  secMarriageExpectations:{en:'Section C — Marriage-specific Expectations',hi:'हिस्सा C — निकाह की उम्मीदें'},
  secShared:{en:'Section C (continued) — Shared',hi:'हिस्सा C (जारी) — साझा'},
  optTag:{en:'(optional)',hi:'(ज़रूरी नहीं)'},

  lblName:{en:'Full name',hi:'पूरा नाम'},
  phName:{en:'e.g. Aisha Malik',hi:'जैसे आयशा मलिक'},
  errName:{en:'Please enter your full name (first and last name, at least 2 words).',hi:'कृपया पूरा नाम लिखें (पहला और आख़िरी नाम, कम से कम 2 शब्द)।'},
  lblRegisterAs:{en:'Register as',hi:'आप कौन हैं'},
  errRegisterAs:{en:'Please select how you are registering.',hi:'कृपया बताएं आप कैसे रजिस्टर कर रहे हैं।'},
  lblWaliPhone:{en:'Wali phone number',hi:'वली का फ़ोन नंबर'},
  phWaliPhone:{en:'+91 98765 43210',hi:'+91 98765 43210'},
  errWaliPhone:{en:'Please enter the Wali phone number.',hi:'कृपया वली का फ़ोन नंबर दर्ज करें।'},
  lblWaliRelation:{en:'Relation to the person',hi:'उस इंसान से क्या रिश्ता है'},
  phWaliRelation:{en:'e.g. Father, Brother, Uncle',hi:'जैसे बाप, भाई, चाचा'},
  errWaliRelation:{en:'Please describe the Wali relation.',hi:'कृपया वली का रिश्ता बताएं।'},
  lblDob:{en:'Date of birth',hi:'जन्म तारीख़'},
  errDob:{en:'Please select a valid date of birth (age 18–70).',hi:'कृपया सही जन्म तारीख़ चुनें (उम्र 18–70)।'},
  lblGender:{en:'Gender',hi:'जेंडर'},
  errGender:{en:'Please select your gender.',hi:'कृपया जेंडर चुनें।'},
  lblMarital:{en:'Marital status',hi:'शादी की स्थिति'},
  errMarital:{en:'Please select your marital status.',hi:'कृपया शादी की स्थिति चुनें।'},
  tipMarital:{en:'Your current marital status. If you select "Divorced," we will ask one quick follow-up about documentation.',hi:'आपकी अभी की शादी की स्थिति। अगर "तलाकशुदा" चुनते हैं तो हम कागज़ात के बारे में एक सवाल पूछेंगे।'},
  lblChildren:{en:'Do you have children?',hi:'क्या आपके बच्चे हैं?'},
  errChildren:{en:'Please answer this question.',hi:'कृपया इस सवाल का जवाब दें।'},
  lblChildrenCount:{en:'How many children do you have?',hi:'कितने बच्चे हैं?'},
  lblChildrenCustody:{en:'Who do they currently live with?',hi:'वो फ़िलहाल किसके साथ रहते हैं?'},
  tipChildrenCustody:{en:'This helps potential matches understand your family situation upfront. Choose whichever option fits best, or skip if you would rather discuss this directly.',hi:'इससे मैचेज़ को आपकी पारिवारिक स्थिति पहले से पता चलती है। जो सही लगे वो चुनें, या छोड़ दें अगर सीधे बात करना पसंद हो।'},
  lblChildrenDetails:{en:"Anything else you'd like to share about your children",hi:'बच्चों के बारे में कुछ और बताना हो तो'},
  phChildrenDetails:{en:'e.g. their ages, schooling, or anything relevant to a future spouse',hi:'जैसे उनकी उम्र, पढ़ाई, या कोई और ज़रूरी बात'},
  lblDivorceDocs:{en:'Do you have your divorce certificate / decree?',hi:'क्या आपके पास तलाक का सर्टिफ़िकेट है?'},
  tipDivorceDocs:{en:'We ask this so families can verify divorce status later if needed. It is not shared publicly on your profile.',hi:'हम ये इसलिए पूछते हैं ताकि ज़रूरत पड़ने पर परिवार चेक कर सके। ये आपकी प्रोफ़ाइल पर पब्लिक नहीं होगा।'},
  errDivorceDocs:{en:'Please answer this question.',hi:'कृपया इस सवाल का जवाब दें।'},
  lblHeight:{en:'Height',hi:'लम्बाई'},
  lblDisability:{en:'Do you have any physical disability or health condition?',hi:'क्या आपको कोई शारीरिक अक्षमता या बीमारी है?'},
  tipDisability:{en:'This helps us share accurate, honest information with potential matches. It is never used to penalise your profile or hide it from search.',hi:'इससे हम मैचेज़ को सही जानकारी दे पाते हैं। इससे आपकी प्रोफ़ाइल को कोई नुकसान नहीं होगा और न ही ये सर्च में छुपेगी।'},
  lblDisabilityType:{en:'Type of disability / condition',hi:'किस तरह की अक्षमता / बीमारी'},
  lblSect:{en:'Sect',hi:'मसलक'},
  tipSect:{en:'Your branch within Islam (e.g. Sunni, Shia). This is one of the main things used to find compatible matches.',hi:'इस्लाम में आपका मसलक जैसे सुन्नी, शिया। ये अच्छे मैच ढूंढने में सबसे ज़रूरी जानकारी है।'},
  errSect:{en:'Please select a sect.',hi:'कृपया मसलक चुनें।'},
  lblSubsect:{en:'Sub-sect',hi:'उप-मसलक'},
  lblRevert:{en:'Did you convert to Islam (revert)?',hi:'क्या आपने इस्लाम क़बूल किया है (रिवर्ट)?'},
  tipRevert:{en:'A "revert" is someone who embraced Islam after being raised in another faith or no faith. This is for background information only.',hi:'"रिवर्ट" वो होता है जिसने किसी और मज़हब में पले-बढ़े होने के बाद इस्लाम क़बूल किया हो। ये सिर्फ़ पृष्ठभूमि की जानकारी के लिए है।'},
  lblMadhhab:{en:'Madhhab (school of Islamic law)',hi:'मज़हब / फ़िक़ह'},
  tipMadhhab:{en:'Your school of Islamic jurisprudence (fiqh) — for example Hanafi or Shafi\'i. Choose "No preference" if you are unsure.',hi:'आपका फ़िक़ह — जैसे हनफ़ी या शाफ़ई। अगर पक्का नहीं पता तो "कोई फ़र्क़ नहीं" चुन लें।'},
  lblSalah:{en:'Salah frequency',hi:'नमाज़ की पाबंदी'},
  tipSalah:{en:'How regularly you currently pray the five daily prayers.',hi:'आप अभी दिन में पाँचों नमाज़ें कितनी पाबंदी से पढ़ते हैं?'},
  errSalah:{en:'Please select your salah frequency.',hi:'कृपया नमाज़ की पाबंदी चुनें।'},
  lblReligiosity:{en:'My religiosity level',hi:'मेरी दीनदारी का लेवल'},
  tipReligiosity:{en:'A general self-rating of how religious you are day to day — from cultural to highly observant. Select a level.',hi:'आप रोज़ की ज़िंदगी में कितने दीनदार हैं — इसे एक लेवल देकर बताएं।'},
  lblHijab:{en:'Hijab status',hi:'हिजाब'},
  tipHijab:{en:'How you currently observe hijab (covering).',hi:'आप अभी हिजाब किस तरह करती हैं।'},
  errHijab:{en:'Please select your hijab status.',hi:'कृपया हिजाब चुनें।'},
  lblBeard:{en:'Beard status',hi:'दाढ़ी'},
  errBeard:{en:'Please select your beard status.',hi:'कृपया दाढ़ी का ऑप्शन चुनें।'},
  lblProfession:{en:'Profession',hi:'काम-धंधा'},
  phProfession:{en:'Type to search (e.g. doc, eng, law…)',hi:'टाइप करें जैसे डॉक्टर, इंजीनियर…'},
  lblIncome:{en:'Monthly income (INR)',hi:'महीने की कमाई (INR)'},
  lblEducation:{en:'Education level',hi:'तालीम'},
  errEducation:{en:'Please select your education level.',hi:'कृपया अपनी तालीम चुनें।'},
  lblCountry:{en:'Country of residence',hi:'आप कहाँ रहते हैं'},
  errCountry:{en:'Please select your country of residence.',hi:'कृपया अपना देश चुनें।'},
  lblState:{en:'State',hi:'राज्य'},
  errState:{en:'Please select your state.',hi:'कृपया अपना राज्य चुनें।'},
  lblCity:{en:'City',hi:'शहर'},
  phCity:{en:'Type your city',hi:'अपना शहर लिखें'},
  errCity:{en:'Please enter your city.',hi:'कृपया अपना शहर लिखें।'},
  lblNativePlace:{en:'Native place / hometown',hi:'पैतृक जगह / वतन'},
  phNativePlace:{en:'e.g. your ancestral village or hometown',hi:'जैसे आपका गांव या पुश्तैनी शहर'},
  tipNativePlace:{en:'Your ancestral hometown or place of origin — often different from where you currently live.',hi:'वो जगह जहाँ से आपका ख़ानदान है — अक्सर आप जहाँ रहते हैं वो अलग होती है।'},
  lblMotherTongue:{en:'Mother tongue / Ethnicity',hi:'मातृभाषा / कौम'},
  lblLanguages:{en:'Languages spoken',hi:'आप कौन सी ज़बानें बोलते हैं'},
  lblTimeline:{en:'When are you looking to marry?',hi:'आप कब निकाह करना चाहते हैं?'},
  errTimeline:{en:'Please select a timeline.',hi:'कृपया एक टाइमलाइन चुनें।'},
  lblRelocation:{en:'Open to relocation with your partner?',hi:'क्या आप अपने साथी के साथ जगह बदलने के लिए तैयार हैं?'},
  lblWantChildren:{en:'Do you want children?',hi:'क्या आप बच्चे चाहते हैं?'},
  lblFamilyStructure:{en:'Family structure (current home)',hi:'परिवार का ढाँचा (अभी का घर)'},
  lblWaliInvolved:{en:'Is a Wali involved?',hi:'क्या वली शामिल हैं?'},
  tipWaliInvolved:{en:'A Wali is a guardian (usually father, brother, or another appointed elder) traditionally involved in approving a marriage proposal.',hi:'वली वो अभिभावक होता है जो रिश्ते में शामिल होते हैं — आमतौर पर बाप, भाई या कोई बुज़ुर्ग।'},
  lblWhoSearching:{en:'Who is conducting this search?',hi:'यह तलाश कौन कर रहा है?'},
  tipWhoSearching:{en:'Are you creating and managing this profile yourself, or is a parent, guardian, or Wali handling it on your behalf?',hi:'क्या आप ख़ुद यह प्रोफ़ाइल बना रहे हैं, या घर से कोई — जैसे माँ-बाप या वली — आपकी तरफ़ से कर रहे हैं?'},
  errWhoSearching:{en:'Please select who is conducting this search.',hi:'कृपया बताएं कि यह तलाश कौन कर रहा है।'},
  lblAboutMe:{en:'About me',hi:'मेरे बारे में'},
  phAboutMe:{en:'Brief introduction, values, goals',hi:'अपना थोड़ा परिचय दें — सोच, मक़सद'},
  lblHobbies:{en:'Hobbies & interests',hi:'शौक़ और दिलचस्पी'},
  lblIdol:{en:'Role model / idol',hi:'आपके रोल मॉडल'},
  phIdol:{en:'e.g. a scholar, family member, public figure',hi:'जैसे कोई आलिम, घर का कोई फ़र्द, या कोई जानी-मानी शख़्सियत'},
  btnNextP2:{en:'Next: Partner sought →',hi:'आगे: पसंदीदा साथी →'},

  lblPGender:{en:'Preferred partner gender',hi:'आप किस लिंग का रिश्ता चाहते हैं'},
  pgenderLockNote:{en:'🔒 Auto-set based on your gender in Part 1 — cannot be changed.',hi:'🔒 पार्ट 1 में दिए गए जेंडर के हिसाब से अपने आप सेट हुआ है — बदला नहीं जा सकता।'},
  errPGender:{en:'Please select preferred partner gender.',hi:'कृपया पसंदीदा साथी का जेंडर चुनें।'},
  lblPAge:{en:'Partner age range',hi:'साथी की उम्र'},
  rangeTo:{en:'to',hi:'से'},
  phMin:{en:'Min age',hi:'कम से कम'},
  phMax:{en:'Max age',hi:'ज़्यादा से ज़्यादा'},
  errPAge:{en:'Please enter a valid age range (18–70, max ≥ min).',hi:'कृपया सही उम्र दर्ज करें (18–70, अधिकतम ≥ न्यूनतम)।'},
  lblPHeight:{en:'Preferred height range',hi:'साथी की लम्बाई'},
  lblPSect:{en:'Preferred sect',hi:'पसंदीदा मसलक'},
  tipPSect:{en:'The sect you would prefer your partner to belong to. Choose "No preference" if it does not matter to you.',hi:'आप किस मसलक का साथी चाहते हैं। अगर फ़र्क़ नहीं पड़ता तो "कोई फ़र्क़ नहीं" चुनें।'},
  errPSect:{en:'Please select preferred sect.',hi:'कृपया पसंदीदा मसलक चुनें।'},
  lblPSubsect:{en:'Preferred sub-sect',hi:'पसंदीदा उप-मसलक'},
  lblPMadhhab:{en:'Preferred Madhhab',hi:'पसंदीदा मज़हब / फ़िक़ह'},
  tipPMadhhab:{en:'The school of Islamic jurisprudence (fiqh) you would prefer in a partner.',hi:'आप साथी में कौन सा फ़िक़ह पसंद करेंगे।'},
  lblPSalah:{en:'Preferred Salah frequency',hi:'साथी की नमाज़ की पाबंदी'},
  lblPReligiosity:{en:'Preferred religiosity level',hi:'साथी की दीनदारी का लेवल'},
  lblPHijab:{en:'Hijab preference',hi:'हिजाब की तरजीह'},
  tipPHijab:{en:'Whether you would like your future wife to observe hijab.',hi:'क्या आप चाहते हैं कि आपकी होने वाली बीवी हिजाब करें।'},
  lblPBeard:{en:'Beard preference',hi:'दाढ़ी की तरजीह'},
  lblPMarital:{en:'Preferred marital status',hi:'साथी की वैवाहिक स्थिति'},
  lblPChildren:{en:'Acceptable if partner has children?',hi:'क्या साथी के बच्चे हों तो चलेगा?'},
  lblPProfession:{en:'Preferred profession',hi:'पसंदीदा पेशा'},
  lblPEmployment:{en:'Employment preference',hi:'क्या काम करना ज़रूरी है'},
  lblPEducation:{en:'Preferred education level',hi:'पसंदीदा तालीम'},
  lblPRegion:{en:'Preferred region',hi:'पसंदीदा इलाक़ा'},
  optAnyRegion:{en:'Open to any region',hi:'कोई भी इलाक़ा ठीक है'},
  errPRegion:{en:'Please select a preferred region or tick "Open to any region."',hi:'कृपया पसंदीदा इलाक़ा चुनें या "कोई भी इलाक़ा ठीक है" पर टिक करें।'},
  lblPRelocate:{en:'Should partner be willing to relocate?',hi:'क्या साथी को जगह बदलने के लिए तैयार होना चाहिए?'},
  lblLivingArrangement:{en:'Living arrangement after marriage',hi:'निकाह के बाद कहाँ रहेंगे'},
  errLivingArrangement:{en:'Please select a living arrangement.',hi:'कृपया रहने की व्यवस्था चुनें।'},
  lblPWantChildren:{en:'Children preference',hi:'बच्चों के बारे में सोच'},
  lblPTimeline:{en:'Preferred Nikah timeline',hi:'निकाह की टाइमलाइन'},
  lblPMotherTongue:{en:'Mother tongue preference',hi:'पसंदीदा मातृभाषा'},
  lblPWali:{en:'Wali involvement expected from partner?',hi:'क्या साथी से वली की शमूलियत चाहते हैं?'},
  tipPWali:{en:'Whether you expect your partner\'s side to involve a Wali (guardian) in the proposal process.',hi:'क्या आप चाहते हैं कि साथी के घर से कोई वली रिश्ते में शामिल हो।'},
  lblPExpectations:{en:'Any other expectations',hi:'कोई और उम्मीदें'},
  phExpectations:{en:'Free text',hi:'अपनी बात लिखें'},
  btnBack:{en:'← Back',hi:'← पीछे'},
  btnNextP3:{en:'Next: Religious preferences →',hi:'आगे: दीनी पसंद →'},

  lblHifz:{en:'Quran memorisation (Hifz)',hi:'क़ुरआन हिफ़्ज़'},
  tipHifz:{en:'Hifz means memorisation of the Qur\'an. A "Hafiz" (male) or "Hafiza" (female) is someone who has fully memorised it.',hi:'हिफ़्ज़ मतलब क़ुरआन ज़बानी याद होना। पूरा याद हो तो "हाफ़िज़" (मर्द) या "हाफ़िज़ा" (औरत) कहते हैं।'},
  lblQuranReading:{en:'Quran reading habit',hi:'क़ुरआन पढ़ने की आदत'},
  lblIslamicEducation:{en:'Islamic education level',hi:'दीनी तालीम'},
  tipIslamicEducation:{en:'How much formal or informal Islamic education you have received — for example at home, in a madrasa, or through a recognised Islamic degree.',hi:'आपने कितनी दीनी तालीम ली है — जैसे घर पर, मदरसे में, या कोई बाक़ायदा इस्लामी डिग्री।'},
  lblLifestyleGoals:{en:'Islamic lifestyle goals',hi:'इस्लामी ज़िंदगी के मक़सद'},
  lblStudyIslam:{en:'Interested in studying Islam further?',hi:'क्या आगे दीन की तालीम लेना चाहते हैं?'},
  lblHalalDiet:{en:'Halal diet adherence',hi:'हलाल खाने की पाबंदी'},
  lblFasting:{en:'Fasting habit',hi:'रोज़े की आदत'},
  lblZakat:{en:'Zakat / Sadaqah practice',hi:'ज़कात / सदक़ा'},
  lblSmoking:{en:'Smoking status',hi:'धूम्रपान / सिगरेट'},
  errSmoking:{en:'Please select your smoking status.',hi:'कृपया सिगरेट का ऑप्शन चुनें।'},
  lblAlcohol:{en:'Alcohol consumption',hi:'शराब का सेवन'},
  errAlcohol:{en:'Please select your alcohol consumption.',hi:'कृपया शराब का ऑप्शन चुनें।'},
  lblHalalEntertainment:{en:'Halal entertainment standards',hi:'मनोरंजन में हलाल का ख़याल'},
  tipHalalEntertainment:{en:'How strictly you limit movies, TV, music and other entertainment based on Islamic guidelines.',hi:'आप फ़िल्म, टीवी, संगीत वगैरह में कितनी इस्लामी रोक-टोक रखते हैं।'},
  lblMixedGender:{en:'Mixed-gender interaction comfort',hi:'गैर-मेहरम के साथ मेलजोल में कितनी सहूलियत'},
  tipMixedGender:{en:'Your comfort level interacting with the opposite gender outside close family — for example at work, college, or social settings.',hi:'घर के बाहर — जैसे दफ़्तर, कॉलेज या सोशल जगहों पर — दूसरे जेंडर से मिलने-जुलने में आप कितने सहज हैं।'},
  lblMusic:{en:'Music / Nasheed views',hi:'संगीत / नशीद के बारे में सोच'},

  lblNafaqah:{en:'Financial readiness for Nikah (Nafaqah)',hi:'निकाह के लिए माली तैयारी (नफ़क़ा)'},
  tipNafaqah:{en:'Nafaqah is the Islamic obligation of a husband to financially provide for his wife and family after marriage.',hi:'नफ़क़ा यानी निकाह के बाद शौहर का बीवी और बच्चों का खर्च उठाना — यह इस्लामी फ़र्ज़ है।'},
  errNafaqah:{en:'Please select your financial readiness.',hi:'कृपया माली तैयारी चुनें।'},
  lblWifeWorking:{en:'Attitude toward wife working',hi:'बीवी के काम करने पर आपकी सोच'},
  lblMahram:{en:"Guardian of wife's travel (mahram)",hi:'बीवी की सफ़र के लिए महरम'},
  lblHousing:{en:'Housing status',hi:'रहने की जगह'},
  lblMahrOffer:{en:'Mahr offering capacity',hi:'मेहर देने की क्षमता'},
  tipMahr:{en:'Mahr is a mandatory gift from the groom to the bride at marriage, agreed upon by both sides. It is not a dowry and is the bride\'s own property.',hi:'मेहर वो तोहफ़ा है जो दूल्हा दुल्हन को निकाह के वक़्त देता है — दोनों की रज़ामंदी से तय होता है। यह जहेज़ नहीं है, ये दुल्हन की अपनी मिल्कियत होती है।'},
  lblCareerAfterMarriage:{en:'Career plans after marriage',hi:'निकाह के बाद करियर की सोच'},
  lblProposalContact:{en:'Proposal contact preference',hi:'रिश्ते का संपर्क कैसे हो'},
  tipProposalContact:{en:'How you would like a man\'s family to reach out to you — directly, through your Wali, or only via in-app messaging.',hi:'आप चाहते हैं कि रिश्ता करने वाला परिवार कैसे संपर्क करे — सीधे, वली के ज़रिए, या सिर्फ़ ऐप पर।'},
  errProposalContact:{en:'Please select a proposal contact preference.',hi:'कृपया संपर्क का तरीक़ा चुनें।'},
  lblMahrExpectation:{en:'Mahr expectation',hi:'मेहर की उम्मीद'},
  lblWaliName:{en:"Wali's name",hi:'वली का नाम'},
  phWaliName:{en:"Guardian's full name",hi:'वली का पूरा नाम'},
  errWaliName:{en:"Please enter your Wali's name.",hi:'कृपया वली का नाम लिखें।'},
  lblWaliRelationship:{en:"Wali's relationship to you",hi:'वली का आपसे रिश्ता'},
  tipWaliRelationship:{en:'Your Wali is your marriage guardian — typically your father, brother, uncle, or another appointed elder.',hi:'वली आपके निकाह के ज़िम्मेदार होते हैं — आमतौर पर बाप, भाई, चाचा/मामा या कोई और बुज़ुर्ग।'},
  errWaliRelationship:{en:"Please select Wali's relationship to you.",hi:'कृपया वली का रिश्ता चुनें।'},
  lblWaliDisplayToggle:{en:'Would you like to display Wali details on your profile?',hi:'क्या आप अपनी प्रोफ़ाइल पर वली की जानकारी दिखाना चाहते हैं?'},
  tipWaliDisplayToggle:{en:"Sharing your Wali's name and relationship can help build trust with families who prefer guardian-mediated contact. This is completely optional — choose \"No\" if you'd rather not share it.",hi:'वली का नाम और रिश्ता शेयर करने से उन घरों का भरोसा बढ़ता है जो वली के ज़रिए बात करना पसंद करते हैं। यह पूरी तरह ऐच्छिक है — न चाहें तो "नहीं" चुनें।'},
  lblWaliDisplayName:{en:"Wali's name",hi:'वली का नाम'},
  phWaliDisplayName:{en:'e.g. Mohammed Ali Khan',hi:'जैसे मोहम्मद अली ख़ान'},
  lblWaliDisplayPhone:{en:"Wali's phone number",hi:'वली का फ़ोन नंबर'},
  phWaliDisplayPhone:{en:'+91 98765 43210',hi:'+91 98765 43210'},
  lblWaliDisplayRelationship:{en:"Wali's relationship to you",hi:'वली का आपसे रिश्ता'},
  lblWaliShowContact:{en:'Would you also like to show this contact number on your profile?',hi:'क्या यह नंबर भी प्रोफ़ाइल पर दिखाना चाहते हैं?'},
  tipWaliShowContact:{en:"If you choose \"No,\" the Wali's number is kept on file for verification only and is never shown on your public profile. Choose \"Yes\" only if you're comfortable with serious matches seeing it directly.",hi:'अगर "नहीं" चुनते हैं तो नंबर सिर्फ़ वेरिफ़िकेशन के लिए रहेगा और प्रोफ़ाइल पर नहीं दिखेगा। "हाँ" तभी चुनें जब आप चाहते हों कि गंभीर रिश्ते सीधे संपर्क करें।'},
  lblWeddingType:{en:'Wedding type preference',hi:'शादी किस तरह की होनी चाहिए'},
  lblWeddingRituals:{en:'Which functions/rituals would you like to have?',hi:'कौन कौन से प्रोग्राम चाहते हैं?'},
  lblParentingStyle:{en:'Islamic parenting style preference',hi:'बच्चों की इस्लामी परवरिश का तरीक़ा'},
  lblRoleVision:{en:'Husband-wife role vision',hi:'पति-पत्नी की भूमिका के बारे में सोच'},
  lblDeen:{en:'Anything else about your deen',hi:'अपने दीन के बारे में कुछ और बताएं'},
  phDeen:{en:'Free text',hi:'अपनी बात लिखें'},
  btnSubmit:{en:'Submit profile →',hi:'प्रोफ़ाइल जमा करें →'},

  doneTitle:{en:'Profile submitted successfully!',hi:'प्रोफ़ाइल जमा हो गई!'},
  doneSub:{en:'This is a demo — no real data has been stored or transmitted.',hi:'यह एक डेमो है — कोई असली डेटा सेव या भेजा नहीं गया।'},
  btnRestart:{en:'Start over',hi:'फिर से शुरू करें'}
};

/* ── Option sets (radio / checkbox pills & dropdowns) ── */
const O = {
  gender:[{v:'male',en:'Male',hi:'पुरुष'},{v:'female',en:'Female',hi:'महिला'}],
  marital:[{v:'never',en:'Never married',hi:'अविवाहित'},{v:'divorced',en:'Divorced',hi:'तलाकशुदा'},{v:'widowed',en:'Widowed',hi:'विधवा/विधुर'}],
  yesNo:[{v:'yes',en:'Yes',hi:'हाँ'},{v:'no',en:'No',hi:'नहीं'}],
  childrenCount:[{v:'1',en:'1',hi:'1'},{v:'2',en:'2',hi:'2'},{v:'3',en:'3',hi:'3'},{v:'4plus',en:'4+',hi:'4+'}],
  childrenCustody:[{v:'withMe',en:'With me',hi:'मेरे साथ'},{v:'withOtherParent',en:'With their other parent',hi:'उनके दूसरे माता/पिता के साथ'},{v:'withOtherFamily',en:'With other family',hi:'अन्य परिवार के साथ'},{v:'shared',en:'Shared arrangement',hi:'साझा व्यवस्था'}],
  registerAs:[{v:'bride',en:'Bride',hi:'दुल्हन'},{v:'groom',en:'Groom',hi:'दूल्हा'},{v:'wali',en:'Wali',hi:'वली'}],
  sect:[{v:'sunni',en:'Sunni',hi:'सुन्नी'},{v:'shia',en:'Shia',hi:'शिया'},{v:'justMuslim',en:'Just Muslim (non-sectarian)',hi:'सिर्फ़ मुस्लिम (गैर-संप्रदायिक)'},{v:'pnts',en:'Prefer not to say',hi:'नहीं बताना चाहते'}],
  psect:[{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'},{v:'sunni',en:'Sunni',hi:'सुन्नी'},{v:'shia',en:'Shia',hi:'शिया'},{v:'justMuslim',en:'Just Muslim',hi:'सिर्फ़ मुस्लिम'}],
  madhhab:[{v:'hanafi',en:'Hanafi',hi:'हनफ़ी'},{v:'maliki',en:'Maliki',hi:'मालिकी'},{v:'shafii',en:"Shafi'i",hi:'शाफ़ई'},{v:'hanbali',en:'Hanbali',hi:'हनबली'},{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'}],
  pmadhhab:[{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'},{v:'hanafi',en:'Hanafi',hi:'हनफ़ी'},{v:'maliki',en:'Maliki',hi:'मालिकी'},{v:'shafii',en:"Shafi'i",hi:'शाफ़ई'},{v:'hanbali',en:'Hanbali',hi:'हनबली'}],
  salah:[{v:'5x',en:'5× daily',hi:'दिन में 5 बार'},{v:'mostly',en:'Mostly regular',hi:'अधिकतर नियमित'},{v:'sometimes',en:'Sometimes',hi:'कभी-कभी'},{v:'learning',en:'Still learning',hi:'अभी सीख रहे हैं'}],
  psalah:[{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'},{v:'5x',en:'5× daily',hi:'दिन में 5 बार'},{v:'mostly',en:'Mostly regular',hi:'अधिकतर नियमित'},{v:'anyPracticing',en:'Any practicing level',hi:'कोई भी पाबंद स्तर'}],
  hijab:[{v:'niqab',en:'Niqab',hi:'नक़ाब'},{v:'fullAlways',en:'Full hijab always',hi:'हमेशा पूरा हिजाब'},{v:'sometimes',en:'Sometimes',hi:'कभी-कभी'},{v:'notCurrently',en:'Not currently',hi:'अभी नहीं'}],
  phijab:[{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'},{v:'required',en:'Hijab required',hi:'हिजाब आवश्यक'},{v:'preferredNotRequired',en:'Preferred, not required',hi:'पसंदीदा, आवश्यक नहीं'}],
  beard:[{v:'full',en:'Full beard (Sunnah)',hi:'पूरी दाढ़ी (सुन्नत)'},{v:'trimmed',en:'Trimmed',hi:'ट्रिम की हुई'},{v:'clean',en:'Clean shaven',hi:'क्लीन शेव'}],
  pbeard:[{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'},{v:'preferred',en:'Beard preferred',hi:'दाढ़ी पसंदीदा'},{v:'either',en:'Either is fine',hi:'कोई भी ठीक है'}],
  income:[{v:'u20k',en:'Below ₹20K',hi:'₹20 हज़ार से कम'},{v:'20-40k',en:'₹20–40K',hi:'₹20–40 हज़ार'},{v:'40-70k',en:'₹40–70K',hi:'₹40–70 हज़ार'},{v:'70k-1l',en:'₹70K–1L',hi:'₹70 हज़ार – 1 लाख'},{v:'1-2l',en:'₹1–2L',hi:'₹1–2 लाख'},{v:'above2l',en:'Above ₹2L',hi:'₹2 लाख से ऊपर'},{v:'pnts',en:'Prefer not to say',hi:'नहीं बताना चाहते'}],
  education:[{v:'noFormal',en:'Not educated / No formal education',hi:'कोई औपचारिक तालीम नहीं'},{v:'highschool',en:'High school',hi:'हाई स्कूल'},{v:'diploma',en:'Diploma',hi:'डिप्लोमा'},{v:'bachelors',en:"Bachelor's",hi:'ग्रेजुएट'},{v:'masters',en:"Master's",hi:'पोस्ट ग्रेजुएट'},{v:'phd',en:'PhD',hi:'पीएचडी'},{v:'islamic',en:'Islamic degree',hi:'इस्लामी डिग्री'},{v:'other',en:'Other',hi:'अन्य'}],
  peducation:[{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'},{v:'highschool',en:'At least high school',hi:'कम से कम हाई स्कूल'},{v:'bachelors',en:"At least bachelor's",hi:'कम से कम ग्रेजुएट'},{v:'mastersPlus',en:"Master's or above",hi:'पोस्ट ग्रेजुएट या उससे ऊपर'}],
  country:[{v:'IN',en:'India',hi:'भारत'},{v:'AE',en:'UAE',hi:'यूएई'},{v:'GB',en:'UK',hi:'यूके'},{v:'US',en:'USA',hi:'यूएसए'},{v:'CA',en:'Canada',hi:'कनाडा'},{v:'AU',en:'Australia',hi:'ऑस्ट्रेलिया'},{v:'SA',en:'Saudi Arabia',hi:'सऊदी अरब'},{v:'QA',en:'Qatar',hi:'क़तर'},{v:'MY',en:'Malaysia',hi:'मलेशिया'},{v:'PK',en:'Pakistan',hi:'पाकिस्तान'},{v:'BD',en:'Bangladesh',hi:'बांग्लादेश'},{v:'other',en:'Other',hi:'अन्य'}],
  states:[
    {v:'AP',en:'Andhra Pradesh',hi:'आंध्र प्रदेश'},{v:'AR',en:'Arunachal Pradesh',hi:'अरुणाचल प्रदेश'},{v:'AS',en:'Assam',hi:'असम'},
    {v:'BR',en:'Bihar',hi:'बिहार'},{v:'CG',en:'Chhattisgarh',hi:'छत्तीसगढ़'},{v:'GA',en:'Goa',hi:'गोवा'},
    {v:'GJ',en:'Gujarat',hi:'गुजरात'},{v:'HR',en:'Haryana',hi:'हरियाणा'},{v:'HP',en:'Himachal Pradesh',hi:'हिमाचल प्रदेश'},
    {v:'JH',en:'Jharkhand',hi:'झारखंड'},{v:'KA',en:'Karnataka',hi:'कर्नाटक'},{v:'KL',en:'Kerala',hi:'केरल'},
    {v:'MP',en:'Madhya Pradesh',hi:'मध्य प्रदेश'},{v:'MH',en:'Maharashtra',hi:'महाराष्ट्र'},{v:'MN',en:'Manipur',hi:'मणिपुर'},
    {v:'ML',en:'Meghalaya',hi:'मेघालय'},{v:'MZ',en:'Mizoram',hi:'मिज़ोरम'},{v:'NL',en:'Nagaland',hi:'नागालैंड'},
    {v:'OD',en:'Odisha',hi:'ओडिशा'},{v:'PB',en:'Punjab',hi:'पंजाब'},{v:'RJ',en:'Rajasthan',hi:'राजस्थान'},
    {v:'SK',en:'Sikkim',hi:'सिक्किम'},{v:'TN',en:'Tamil Nadu',hi:'तमिलनाडु'},{v:'TS',en:'Telangana',hi:'तेलंगाना'},
    {v:'TR',en:'Tripura',hi:'त्रिपुरा'},{v:'UP',en:'Uttar Pradesh',hi:'उत्तर प्रदेश'},{v:'UK',en:'Uttarakhand',hi:'उत्तराखंड'},
    {v:'WB',en:'West Bengal',hi:'पश्चिम बंगाल'},
    {v:'AN',en:'Andaman & Nicobar Islands',hi:'अंडमान और निकोबार द्वीप समूह'},{v:'CH',en:'Chandigarh',hi:'चंडीगढ़'},
    {v:'DN',en:'Dadra & Nagar Haveli and Daman & Diu',hi:'दादरा और नगर हवेली और दमन और दीव'},{v:'DL',en:'Delhi',hi:'दिल्ली'},
    {v:'JK',en:'Jammu & Kashmir',hi:'जम्मू और कश्मीर'},{v:'LA',en:'Ladakh',hi:'लद्दाख'},{v:'LD',en:'Lakshadweep',hi:'लक्षद्वीप'},
    {v:'PY',en:'Puducherry',hi:'पुदुचेरी'}
  ],
  motherTongue:[{v:'urdu',en:'Urdu',hi:'उर्दू'},{v:'hindi',en:'Hindi',hi:'हिंदी'},{v:'arabic',en:'Arabic',hi:'अरबी'},{v:'malayalam',en:'Malayalam',hi:'मलयालम'},{v:'tamil',en:'Tamil',hi:'तमिल'},{v:'bengali',en:'Bengali',hi:'बंगाली'},{v:'gujarati',en:'Gujarati',hi:'गुजराती'},{v:'marathi',en:'Marathi',hi:'मराठी'},{v:'punjabi',en:'Punjabi',hi:'पंजाबी'},{v:'telugu',en:'Telugu',hi:'तेलुगु'},{v:'kannada',en:'Kannada',hi:'कन्नड़'},{v:'sindhi',en:'Sindhi',hi:'सिंधी'},{v:'kashmiri',en:'Kashmiri',hi:'कश्मीरी'},{v:'balochi',en:'Balochi',hi:'बलूची'},{v:'pashto',en:'Pashto',hi:'पश्तो'},{v:'persian',en:'Persian',hi:'फ़ारसी'},{v:'turkish',en:'Turkish',hi:'तुर्की'},{v:'malay',en:'Malay',hi:'मलय'},{v:'somali',en:'Somali',hi:'सोमाली'},{v:'swahili',en:'Swahili',hi:'स्वाहिली'},{v:'indonesian',en:'Indonesian',hi:'इंडोनेशियाई'},{v:'hausa',en:'Hausa',hi:'हौसा'},{v:'other',en:'Other',hi:'अन्य'}],
  pmotherTongue:null, // filled below: noPref + motherTongue
  languagesSpoken:[{v:'urdu',en:'Urdu',hi:'उर्दू'},{v:'hindi',en:'Hindi',hi:'हिंदी'},{v:'english',en:'English',hi:'अंग्रेज़ी'},{v:'arabic',en:'Arabic',hi:'अरबी'},{v:'malayalam',en:'Malayalam',hi:'मलयालम'},{v:'tamil',en:'Tamil',hi:'तमिल'},{v:'bengali',en:'Bengali',hi:'बंगाली'},{v:'gujarati',en:'Gujarati',hi:'गुजराती'},{v:'marathi',en:'Marathi',hi:'मराठी'},{v:'punjabi',en:'Punjabi',hi:'पंजाबी'},{v:'telugu',en:'Telugu',hi:'तेलुगु'},{v:'kannada',en:'Kannada',hi:'कन्नड़'},{v:'french',en:'French',hi:'फ़्रेंच'},{v:'german',en:'German',hi:'जर्मन'},{v:'turkish',en:'Turkish',hi:'तुर्की'},{v:'malay',en:'Malay',hi:'मलय'},{v:'indonesian',en:'Indonesian',hi:'इंडोनेशियाई'},{v:'swahili',en:'Swahili',hi:'स्वाहिली'},{v:'persian',en:'Persian',hi:'फ़ारसी'},{v:'somali',en:'Somali',hi:'सोमाली'},{v:'japanese',en:'Japanese',hi:'जापानी'},{v:'mandarin',en:'Chinese (Mandarin)',hi:'चीनी (मंदारिन)'},{v:'other',en:'Other',hi:'अन्य'}],
  timeline:[{v:'asap',en:'As soon as possible',hi:'जितना जल्दी हो'},{v:'6mo',en:'Within 6 months',hi:'6 महीने में'},{v:'1yr',en:'Within a year',hi:'एक साल में'},{v:'open',en:'Open / not decided',hi:'अभी तय नहीं'}],
  ptimeline:[{v:'asap',en:'ASAP',hi:'जितना जल्दी हो'},{v:'6mo',en:'Within 6 months',hi:'6 महीने में'},{v:'1yr',en:'Within a year',hi:'एक साल में'},{v:'open',en:'Open',hi:'खुला'}],
  relocation:[{v:'yes',en:'Yes',hi:'हाँ'},{v:'no',en:'No',hi:'नहीं'},{v:'maybe',en:'Maybe / depends',hi:'शायद / हालात पर'}],
  prelocate:[{v:'required',en:'Yes required',hi:'हाँ ज़रूरी है'},{v:'preferred',en:'Preferred',hi:'पसंद करेंगे'},{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'}],
  wantChildren:[{v:'yes',en:'Yes',hi:'हाँ'},{v:'no',en:'No',hi:'नहीं'},{v:'open',en:'Open',hi:'खुला विचार'}],
  familyStructure:[{v:'nuclear',en:'Nuclear family',hi:'अलग घर'},{v:'joint',en:'Joint family',hi:'एक साथ बड़ा परिवार'}],
  whoSearching:[{v:'myself',en:'Myself',hi:'मैं ख़ुद'},{v:'parentFamily',en:'Parent / family',hi:'माँ-बाप / घरवाले'},{v:'guardian',en:'Guardian',hi:'सरपरस्त'},{v:'wali',en:'Wali',hi:'वली'}],
  pmarital:[{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'},{v:'never',en:'Never married',hi:'पहले कभी शादी न हुई हो'},{v:'divorcedOk',en:'Divorced acceptable',hi:'तलाकशुदा भी चलेगा'},{v:'widowedOk',en:'Widowed acceptable',hi:'विधवा/विधुर भी चलेगा'}],
  pchildren:[{v:'yes',en:'Yes acceptable',hi:'हाँ चलेगा'},{v:'preferNone',en:'Prefer no children',hi:'बेहतर हो कि बच्चे न हों'},{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'}],
  pemployment:[{v:'working',en:'Working / employed',hi:'नौकरी/काम करती हो'},{v:'nonworking',en:'Non-working / homemaker',hi:'घर संभाले'},{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'}],
  livingArrangement:[{v:'independent',en:'Independent home',hi:'अलग घर'},{v:'withInlaws',en:'With in-laws',hi:'ससुराल के साथ'},{v:'flexible',en:'Flexible',hi:'लचीला'}],
  pwantchildren:[{v:'want',en:'Want children',hi:"बच्चे चाहते हैं"},{v:'dontWant',en:"Don't want children",hi:'बच्चे नहीं चाहते'},{v:'open',en:'Open',hi:'खुला विचार'}],
  pwali:[{v:'required',en:'Yes required',hi:'हाँ ज़रूरी है'},{v:'preferred',en:'Preferred',hi:'पसंद करेंगे'},{v:'noPref',en:'No preference',hi:'कोई फ़र्क़ नहीं'}],

  hifz:[{v:'complete',en:'Complete Hafiz/Hafiza',hi:'पूर्ण हाफ़िज़/हाफ़िज़ा'},{v:'partial',en:'Partial (few Juz)',hi:'आंशिक (कुछ पारे)'},{v:'none',en:'None',hi:'कोई नहीं'}],
  quranReading:[{v:'daily',en:'Daily',hi:'रोज़ाना'},{v:'weekly',en:'Weekly',hi:'साप्ताहिक'},{v:'occasionally',en:'Occasionally',hi:'कभी-कभी'},{v:'ramadanOnly',en:'Only during Ramadan',hi:'केवल रमज़ान में'},{v:'learning',en:'Learning to read',hi:'पढ़ना सीख रहे हैं'}],
  islamicEducation:[{v:'basic',en:'Basic (home/masjid)',hi:'बुनियादी (घर/मस्जिद)'},{v:'madrasa',en:'Madrasa educated',hi:'मदरसे से पढ़े हैं'},{v:'islamicDegree',en:'Islamic degree (Alim/Alima)',hi:'इस्लामी डिग्री (आलिम/आलिमा)'},{v:'selfTaught',en:'Self-taught',hi:'ख़ुद से सीखा है'},{v:'none',en:'None',hi:'कोई नहीं'}],
  lifestyleGoals:[{v:'quranicHousehold',en:'Quranic household',hi:'क़ुरआनी घर बनाना'},{v:'islamicSchooling',en:'Islamic schooling for children',hi:'बच्चों को इस्लामी तालीम'},{v:'hijra',en:'Hijra',hi:'हिजरत'},{v:'dawah',en:'Active in dawah',hi:'दावह में हिस्सा'},{v:'tahfizHome',en:'Tahfiz home',hi:'हिफ़्ज़ का घर'},{v:'masjidConnected',en:'Masjid-connected family',hi:'मस्जिद से जुड़ा परिवार'},{v:'simpleLife',en:'Simple modest Islamic life',hi:'सादी इस्लामी ज़िंदगी'}],
  studyIslam:[{v:'yes',en:'Yes',hi:'हाँ'},{v:'no',en:'No',hi:'नहीं'},{v:'already',en:'Already studying',hi:'पहले से पढ़ रहे हैं'}],
  halalDiet:[{v:'strict',en:'Strict halal (certified only)',hi:'सख्त हलाल (सर्टिफ़ाइड ही)'},{v:'preferred',en:'Halal preferred',hi:'हलाल पसंद करते हैं'},{v:'flexible',en:'Flexible',hi:'लचीला'}],
  fasting:[{v:'ramadanPlus',en:'Ramadan + voluntary fasts',hi:'रमज़ान + नफ़्ल रोज़े'},{v:'ramadanOnly',en:'Ramadan only',hi:'सिर्फ़ रमज़ान'},{v:'occasionally',en:'Occasionally',hi:'कभी-कभी'}],
  zakat:[{v:'regular',en:'Regular',hi:'नियमित'},{v:'occasional',en:'Occasional',hi:'कभी-कभी'},{v:'notCurrently',en:'Not currently',hi:'अभी नहीं'}],
  smoking:[{v:'never',en:'Never',hi:'कभी नहीं'},{v:'former',en:'Former smoker',hi:'पहले पीते थे अब नहीं'},{v:'occasional',en:'Occasional',hi:'कभी-कभी'},{v:'regular',en:'Regular',hi:'नियमित'}],
  alcohol:[{v:'never',en:'Never (it is haram)',hi:'कभी नहीं (हराम है)'},{v:'rarely',en:'Rarely',hi:'बहुत कम'},{v:'socially',en:'Socially',hi:'महफ़िलों में'}],
  halalEntertainment:[{v:'strict',en:'Strict (nasheeds only)',hi:'सख्त (सिर्फ़ नशीद)'},{v:'moderate',en:'Moderate (avoids haram)',hi:'दरमियाना (हराम से बचते हैं)'},{v:'flexible',en:'Flexible',hi:'लचीला'}],
  mixedGender:[{v:'strict',en:'Strict separation',hi:'सख्ती से अलग रहते हैं'},{v:'professionalOnly',en:'Professional context only',hi:'सिर्फ़ काम की जगह'},{v:'comfortable',en:'Comfortable in mixed settings',hi:'मिली-जुली जगहों पर सहज हैं'}],
  music:[{v:'nasheedOnly',en:'Nasheed only',hi:'सिर्फ़ नशीद'},{v:'classicalOk',en:'Classical light music OK',hi:'हल्का क्लासिकल ठीक है'},{v:'flexible',en:'Flexible',hi:'लचीला'}],

  nafaqah:[{v:'readyNow',en:'Ready now',hi:'अभी तैयार हूँ'},{v:'within6mo',en:'Within 6 months',hi:'6 महीने में'},{v:'within1yr',en:'Within a year',hi:'एक साल में'},{v:'stillPlanning',en:'Still planning',hi:'अभी सोच रहे हैं'}],
  wifeWorking:[{v:'fullySupports',en:'Fully supports',hi:'पूरी तरह ठीक है'},{v:'neutral',en:'Neutral',hi:'ठीक है'},{v:'prefersHomemaker',en:'Prefers homemaker',hi:'घर संभाले तो बेहतर'}],
  mahram:[{v:'willRequire',en:'Will require mahram',hi:'महरम ज़रूरी होगा'},{v:'wifeDecides',en:'Wife decides',hi:'बीवी ख़ुद तय करेगी'},{v:'flexible',en:'Flexible',hi:'लचीला'}],
  housing:[{v:'ownReady',en:'Own home ready',hi:'अपना घर तैयार है'},{v:'renting',en:'Renting',hi:'किराए का घर'},{v:'withParents',en:'Currently with parents',hi:'फ़िलहाल माँ-बाप के साथ'},{v:'planningSoon',en:'Planning soon',hi:'जल्द इंतज़ाम होगा'}],
  mahrCapacity:[{v:'symbolic',en:'Symbolic',hi:'प्रतीकात्मक'},{v:'moderate',en:'Moderate',hi:'दरमियाना'},{v:'high',en:'High (gold/property)',hi:'ज़्यादा (सोना/जायदाद)'},{v:'openToDiscuss',en:'Open to discussion',hi:'बात करके तय होगा'}],
  careerAfter:[{v:'continue',en:'Continue working',hi:'काम जारी रखेंगी'},{v:'stop',en:'Stop working',hi:'काम छोड़ देंगी'},{v:'partTime',en:'Part-time',hi:'पार्ट-टाइम'},{v:'discuss',en:'Open to discuss with husband',hi:'शौहर से मिलकर तय करेंगी'}],
  proposalContact:[{v:'waliOnly',en:'Through Wali only',hi:'सिर्फ़ वली के ज़रिए'},{v:'directWaliCc',en:'Direct + Wali CC',hi:'सीधे भी और वली को भी'},{v:'platformOnly',en:'Platform messaging only',hi:'सिर्फ़ ऐप पर'}],
  waliRelationship:[{v:'father',en:'Father',hi:'बाप'},{v:'brother',en:'Brother',hi:'भाई'},{v:'uncle',en:'Uncle',hi:'चाचा/मामा'},{v:'appointed',en:'Appointed Wali',hi:'नियुक्त वली'},{v:'none',en:'No wali available',hi:'कोई वली नहीं है'}],
  weddingType:[{v:'simpleNikah',en:'Simple Nikah only (Sunnah)',hi:'सिर्फ़ सादा निकाह (सुन्नत)'},{v:'smallReception',en:'Small family reception',hi:'छोटी पारिवारिक दावत'},{v:'largeWedding',en:'Large wedding',hi:'बड़ी शादी'}],
  parentingStyle:[{v:'islamicSchool',en:'Islamic school',hi:'इस्लामी स्कूल'},{v:'homeschool',en:'Homeschool (Islamic)',hi:'घर पर इस्लामी तालीम'},{v:'publicPlusSupplements',en:'Public school + Islamic supplements',hi:'आम स्कूल + दीनी तालीम साथ में'},{v:'openDiscuss',en:'Open / discuss later',hi:'बाद में मिलकर तय करेंगे'}],
  roleVision:[{v:'traditional',en:'Islamic traditional',hi:'रवायती इस्लामी'},{v:'egalitarian',en:'Egalitarian',hi:'बराबरी वाला'},{v:'flexible',en:'Flexible',hi:'लचीला'}]
};
O.pmotherTongue = [{v:'noPref',en:'No preference',hi:'कोई प्राथमिकता नहीं'}, ...O.motherTongue];

/* ── Sunni / Shia sub-sects ── */
const SUBSECTS = {
  sunni: [
    {v:'barelvi',en:'Barelvi (Sufi-oriented)',hi:'बरेलवी (सूफ़ी उन्मुख)'},
    {v:'deobandi',en:'Deobandi',hi:'देवबंदी'},
    {v:'ahleHadith',en:'Ahl-e-Hadith / Salafi',hi:'अहले हदीस / सलफ़ी'},
    {v:'jamaatIslami',en:'Jamaat-e-Islami influenced',hi:'जमात-ए-इस्लामी प्रभावित'},
    {v:'tablighiJamaat',en:'Tablighi Jamaat influenced',hi:'तबलीग़ी जमात प्रभावित'},
    {v:'nonSectarianSunni',en:'Non-sectarian Sunni',hi:'गैर-संप्रदायिक सुन्नी'},
    {v:'otherSunni',en:'Other Sunni',hi:'अन्य सुन्नी'},
    {v:'pnts',en:'Prefer not to say',hi:'नहीं बताना चाहते'}
  ],
  shia: [
    {v:'twelverUsuli',en:'Twelver (Ithna Ashari) — Usuli',hi:'इस्ना अशरी (बारह इमामी) — उसूली'},
    {v:'twelverAkhbari',en:'Twelver (Ithna Ashari) — Akhbari',hi:'इस्ना अशरी (बारह इमामी) — अख़बारी'},
    {v:'ismailiNizari',en:'Ismaili — Nizari (Aga Khani)',hi:'इस्माइली — निज़ारी (आगा ख़ानी)'},
    {v:'ismailiDawoodiBohra',en:'Ismaili — Dawoodi Bohra',hi:'इस्माइली — दावूदी बोहरा'},
    {v:'ismailiSulaimaniBohra',en:'Ismaili — Sulaimani Bohra',hi:'इस्माइली — सुलेमानी बोहरा'},
    {v:'zaidi',en:'Zaidi',hi:'ज़ैदी'},
    {v:'otherShia',en:'Other Shia',hi:'अन्य शिया'},
    {v:'pnts',en:'Prefer not to say',hi:'नहीं बताना चाहते'}
  ]
};

O.disabilityTypes = [
  {v:'visual',en:'Visual impairment',hi:'दृष्टि बाधित'},
  {v:'hearing',en:'Hearing impairment',hi:'श्रवण बाधित'},
  {v:'speech',en:'Speech impairment',hi:'वाक् बाधित'},
  {v:'mobility',en:'Mobility / physical disability',hi:'गतिशीलता / शारीरिक अक्षमता'},
  {v:'chronicIllness',en:'Chronic illness',hi:'दीर्घकालिक बीमारी'},
  {v:'intellectual',en:'Intellectual / developmental disability',hi:'बौद्धिक / विकासात्मक अक्षमता'},
  {v:'other',en:'Other',hi:'अन्य'},
  {v:'pnts',en:'Prefer not to say',hi:'नहीं बताना चाहते'}
];

O.weddingRituals = [
  {v:'mehndi',en:'Mehndi',hi:'मेहंदी'},
  {v:'haldi',en:'Haldi',hi:'हल्दी'},
  {v:'sangeet',en:'Sangeet / music night',hi:'संगीत रात'},
  {v:'nikahCeremony',en:'Nikah ceremony',hi:'निकाह समारोह'},
  {v:'walima',en:'Walima (reception)',hi:'वलीमा (रिसेप्शन)'},
  {v:'baraat',en:"Baraat (groom's procession)",hi:'बारात'},
  {v:'rukhsati',en:"Rukhsati (bride's farewell)",hi:'रुख़सती'},
  {v:'familyDinner',en:'Joint family dinner',hi:'संयुक्त पारिवारिक भोज'}
];

O.hobbies = [
  {v:'reading',en:'📖 Reading',hi:'📖 पढ़ना'},
  {v:'travel',en:'✈️ Travel',hi:'✈️ यात्रा'},
  {v:'cooking',en:'🍳 Cooking',hi:'🍳 खाना बनाना'},
  {v:'sports',en:'⚽ Sports',hi:'⚽ खेल'},
  {v:'art',en:'🎨 Art',hi:'🎨 कला'},
  {v:'music',en:'🎵 Music',hi:'🎵 संगीत'},
  {v:'photography',en:'📷 Photography',hi:'📷 फ़ोटोग्राफ़ी'},
  {v:'gardening',en:'🌳 Gardening',hi:'🌳 बागवानी'},
  {v:'quranRecitation',en:'🕋 Quran recitation',hi:'🕋 क़ुरआन तिलावत'},
  {v:'calligraphy',en:'✍️ Calligraphy',hi:'✍️ सुलेख'},
  {v:'chess',en:'♟️ Chess',hi:'♟️ शतरंज'},
  {v:'gaming',en:'🎮 Gaming',hi:'🎮 गेमिंग'},
  {v:'fitness',en:'🏋️ Fitness / Gym',hi:'🏋️ फ़िटनेस / जिम'},
  {v:'cycling',en:'🚴 Cycling',hi:'🚴 साइकिलिंग'},
  {v:'horseRiding',en:'🐎 Horseback riding',hi:'🐎 घुड़सवारी'},
  {v:'volunteering',en:'🤲 Volunteering',hi:'🤲 स्वयंसेवा'}
];

/* ── Cities by state (matches O.states codes) ── */
const CITIES_BY_STATE = {
  MH:['Mumbai','Pune','Nagpur','Nashik','Thane','Aurangabad','Solapur','Kolhapur','Amravati','Navi Mumbai'],
  UP:['Lucknow','Kanpur','Agra','Varanasi','Prayagraj','Meerut','Ghaziabad','Noida','Bareilly','Aligarh','Moradabad'],
  KA:['Bengaluru','Mysuru','Hubli','Mangaluru','Belagavi','Davanagere','Kalaburagi','Shivamogga'],
  TN:['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Tiruppur','Vellore'],
  KL:['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Kannur','Malappuram','Palakkad'],
  TS:['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam','Mahbubnagar'],
  AP:['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Tirupati','Kakinada'],
  WB:['Kolkata','Howrah','Siliguri','Durgapur','Asansol','Bardhaman','Malda'],
  GJ:['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Gandhinagar'],
  RJ:['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer','Bhilwara'],
  MP:['Bhopal','Indore','Jabalpur','Gwalior','Ujjain','Sagar'],
  BR:['Patna','Gaya','Bhagalpur','Muzaffarpur','Darbhanga','Bihar Sharif'],
  DL:['New Delhi','Dwarka','Rohini','Saket','Karol Bagh','Lajpat Nagar'],
  PB:['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali'],
  HR:['Faridabad','Gurugram','Panipat','Ambala','Rohtak','Hisar'],
  JK:['Srinagar','Jammu','Anantnag','Baramulla','Udhampur'],
  AS:['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon'],
  AR:['Itanagar','Naharlagun','Pasighat','Tawang'],
  CG:['Raipur','Bhilai','Bilaspur','Korba','Durg'],
  GA:['Panaji','Margao','Vasco da Gama','Mapusa'],
  HP:['Shimla','Manali','Dharamshala','Solan','Kullu'],
  JH:['Ranchi','Jamshedpur','Dhanbad','Bokaro','Hazaribagh'],
  MN:['Imphal','Thoubal','Churachandpur'],
  ML:['Shillong','Tura','Jowai'],
  MZ:['Aizawl','Lunglei','Champhai'],
  NL:['Kohima','Dimapur','Mokokchung'],
  OD:['Bhubaneswar','Cuttack','Rourkela','Puri','Sambalpur'],
  SK:['Gangtok','Namchi','Gyalshing'],
  TR:['Agartala','Udaipur (Tripura)','Dharmanagar'],
  UK:['Dehradun','Haridwar','Rishikesh','Nainital','Haldwani'],
  AN:['Port Blair'],
  CH:['Chandigarh'],
  DN:['Daman','Diu','Silvassa'],
  LA:['Leh','Kargil'],
  LD:['Kavaratti','Agatti'],
  PY:['Puducherry','Karaikal']
};

const RELI_SCALE = [
  {v:'1',en:'Cultural',hi:'सांस्कृतिक',enDesc:'Muslim by heritage; not currently practicing',hiDesc:'विरासत से मुस्लिम; अभी अमल नहीं'},
  {v:'2',en:'Occasional',hi:'कभी-कभी',enDesc:'Prays & fasts sometimes; working on consistency',hiDesc:'कभी-कभी नमाज़ व रोज़ा; सुधार की कोशिश'},
  {v:'3',en:'Moderate',hi:'मध्यम',enDesc:'Regular prayers & halal diet; open to flexibility',hiDesc:'नियमित नमाज़ व हलाल खाना; लचीलापन भी'},
  {v:'4',en:'Practicing',hi:'पाबंद',enDesc:'5 daily prayers; Islamic values guide daily life',hiDesc:'5 वक़्त नमाज़; दैनिक जीवन में इस्लामी मूल्य'},
  {v:'5',en:'Highly observant',hi:'अत्यधिक पाबंद',enDesc:'Islam is central to every aspect of life',hiDesc:'दीन हर पहलू में सर्वोपरि'}
];

/* ── 45 professions (EN/HI) ── */
const PROFESSIONS = [
  {en:'Doctor / Physician',hi:'डॉक्टर / चिकित्सक'},{en:'Dentist',hi:'दंत चिकित्सक'},{en:'Nurse',hi:'नर्स'},
  {en:'Pharmacist',hi:'फार्मासिस्ट'},{en:'Medical Officer',hi:'मेडिकल ऑफिसर'},
  {en:'Engineer (Civil)',hi:'इंजीनियर (सिविल)'},{en:'Engineer (Software)',hi:'इंजीनियर (सॉफ़्टवेयर)'},
  {en:'Engineer (Mechanical)',hi:'इंजीनियर (मैकेनिकल)'},{en:'Engineer (Electrical)',hi:'इंजीनियर (इलेक्ट्रिकल)'},
  {en:'IT Professional',hi:'आईटी पेशेवर'},{en:'Data Analyst',hi:'डेटा विश्लेषक'},{en:'Data Scientist',hi:'डेटा वैज्ञानिक'},
  {en:'Architect',hi:'वास्तुकार'},{en:'Lawyer / Advocate',hi:'वकील'},{en:'Judge',hi:'न्यायाधीश'},
  {en:'CA / Accountant',hi:'सीए / लेखाकार'},{en:'Finance Manager',hi:'वित्त प्रबंधक'},{en:'Banker',hi:'बैंकर'},
  {en:'Investment Analyst',hi:'निवेश विश्लेषक'},{en:'Business Owner',hi:'व्यवसाय स्वामी'},{en:'Entrepreneur',hi:'उद्यमी'},
  {en:'Teacher',hi:'शिक्षक'},{en:'Professor',hi:'प्रोफ़ेसर'},{en:'Principal',hi:'प्रधानाचार्य'},
  {en:'Government Officer (IAS/IPS)',hi:'सरकारी अधिकारी (IAS/IPS)'},{en:'Police Officer',hi:'पुलिस अधिकारी'},
  {en:'Army / Defence Officer',hi:'सेना / रक्षा अधिकारी'},{en:'Pilot',hi:'पायलट'},
  {en:'Cabin Crew / Air Hostess',hi:'केबिन क्रू / एयर होस्टेस'},{en:'Scientist',hi:'वैज्ञानिक'},
  {en:'Researcher',hi:'शोधकर्ता'},{en:'Journalist',hi:'पत्रकार'},{en:'Graphic Designer',hi:'ग्राफिक डिज़ाइनर'},
  {en:'UI/UX Designer',hi:'यूआई/यूएक्स डिज़ाइनर'},{en:'Content Creator',hi:'कंटेंट क्रिएटर'},
  {en:'Social Worker',hi:'सामाजिक कार्यकर्ता'},{en:'NGO Worker',hi:'एनजीओ कार्यकर्ता'},
  {en:'HR Manager',hi:'एचआर प्रबंधक'},{en:'Sales Manager',hi:'सेल्स मैनेजर'},
  {en:'Marketing Manager',hi:'मार्केटिंग मैनेजर'},{en:'Real Estate Agent',hi:'रियल एस्टेट एजेंट'},
  {en:'Consultant',hi:'सलाहकार'},{en:'Homemaker',hi:'गृहिणी'},{en:'Student',hi:'छात्र'},{en:'Other',hi:'अन्य'}
];

/* ════ Render helpers ════ */
function optLabel(o){ return LANG==='hi' ? o.hi : o.en; }

function renderPills(containerId, name, options, type){
  const c = $(containerId);
  c.innerHTML = '';
  options.forEach(o=>{
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = type; input.name = name; input.value = o.v;
    const span = document.createElement('span');
    span.dataset.en = o.en; span.dataset.hi = o.hi;
    span.textContent = optLabel(o);
    label.appendChild(input); label.appendChild(span);
    if(type === 'radio'){
      label.addEventListener('mousedown', ()=>{ input._wasChecked = input.checked; });
      label.addEventListener('click', e=>{
        if(input._wasChecked){ e.preventDefault(); input.checked = false; input._wasChecked = false; }
      });
    }
    c.appendChild(label);
  });
}

function renderReliScale(containerId, name){
  const c = $(containerId);
  c.innerHTML = '';
  RELI_SCALE.forEach(o=>{
    const id = `${name}-reli-${o.v}`;
    const wrap = document.createElement('label');
    const inp = document.createElement('input');
    inp.type='radio'; inp.name=name; inp.value=o.v; inp.id=id;
    const opt = document.createElement('div');
    opt.className='reli-opt';
    const num = document.createElement('span');
    num.className='reli-num'; num.textContent=o.v;
    const lbl = document.createElement('span');
    lbl.className='reli-lbl'; lbl.dataset.en=o.en; lbl.dataset.hi=o.hi; lbl.textContent=optLabel(o);
    const desc = document.createElement('span');
    desc.className='reli-desc'; desc.dataset.en=o.enDesc; desc.dataset.hi=o.hiDesc; desc.textContent=LANG==='hi'?o.hiDesc:o.enDesc;
    opt.appendChild(num); opt.appendChild(lbl); opt.appendChild(desc);
    wrap.appendChild(inp); wrap.appendChild(opt);
    c.appendChild(wrap);
  });
}

function renderSelect(selectId, options, placeholderOpt){
  const sel = $(selectId);
  sel.innerHTML = '';
  const ph = document.createElement('option');
  ph.value=''; ph.dataset.en=placeholderOpt.en; ph.dataset.hi=placeholderOpt.hi; ph.textContent=optLabel(placeholderOpt);
  sel.appendChild(ph);
  options.forEach(o=>{
    const opt = document.createElement('option');
    opt.value=o.v; opt.dataset.en=o.en; opt.dataset.hi=o.hi; opt.textContent=optLabel(o);
    sel.appendChild(opt);
  });
}

function radioVal(name){ const e=document.querySelector(`input[name="${name}"]:checked`); return e?e.value:''; }
function checkboxVals(name){ return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(e=>e.value); }
function val(id){ return $(id).value.trim(); }
function showErr(id){ $(id).classList.add('show'); }
function clearErr(id){ $(id).classList.remove('show'); }
function show(id){ $(id).classList.remove('hidden'); }
function hide(id){ $(id).classList.add('hidden'); }

/* ════ Language switching ════ */
function applyLanguage(){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const key = el.dataset.t;
    if(T[key]) el.textContent = T[key][LANG];
  });
  document.querySelectorAll('[data-t-ph]').forEach(el=>{
    const key = el.dataset.tPh;
    if(T[key]) el.placeholder = T[key][LANG];
  });
  document.querySelectorAll('[data-en][data-hi]').forEach(el=>{
    el.textContent = LANG==='hi' ? el.dataset.hi : el.dataset.en;
  });
  document.querySelectorAll('#lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang===LANG);
  });
  document.documentElement.lang = LANG;
  refreshPartLabel();
  document.querySelectorAll('.reli-desc[data-en]').forEach(el=>{
    el.textContent = LANG==='hi' ? el.dataset.hi : el.dataset.en;
  });
}

function refreshPartLabel(){
  const n = currentPartNum;
  $('part-label').textContent = LANG==='hi' ? `भाग ${n} / 3` : `Part ${n} of 3`;
}

let currentPartNum = 1;

$('lang-toggle').addEventListener('click', e=>{
  const btn = e.target.closest('button[data-lang]');
  if(!btn) return;
  LANG = btn.dataset.lang;
  applyLanguage();
  if(!$('done-card').classList.contains('hidden')) buildSummary();
});

/* ════ Info / help tooltips ════ */
document.addEventListener('click', e=>{
  const infoBtn = e.target.closest('.info-btn');
  if(infoBtn){
    const box = infoBtn.closest('.field').querySelector('.tooltip-box');
    const willOpen = box.classList.contains('hidden');
    document.querySelectorAll('.tooltip-box').forEach(b=>b.classList.add('hidden'));
    document.querySelectorAll('.info-btn').forEach(b=>b.classList.remove('open'));
    if(willOpen){ box.classList.remove('hidden'); infoBtn.classList.add('open'); }
    return;
  }
  if(!e.target.closest('.tooltip-box')){
    document.querySelectorAll('.tooltip-box').forEach(b=>b.classList.add('hidden'));
    document.querySelectorAll('.info-btn').forEach(b=>b.classList.remove('open'));
  }
});

/* ════ Build all pill groups / selects on load ════ */
function buildPart1(){
  renderPills('pg-gender','gender',O.gender,'radio');
  renderPills('pg-marital','marital',O.marital,'radio');
  renderPills('pg-registeras','registerAs',O.registerAs,'radio');
  renderPills('pg-children','children',O.yesNo,'radio');
  renderPills('pg-childrencount','childrenCount',O.childrenCount,'radio');
  renderPills('pg-childrencustody','childrenCustody',O.childrenCustody,'radio');
  renderPills('pg-divorcedocs','divorceDocs',O.yesNo,'radio');
  renderPills('pg-disability','disability',O.yesNo,'radio');
  renderPills('pg-disabilitytype','disabilityType',O.disabilityTypes,'checkbox');
  renderPills('pg-sect','sect',O.sect,'radio');
  renderPills('pg-revert','revert',O.yesNo,'radio');
  renderPills('pg-madhhab','madhhab',O.madhhab,'radio');
  renderPills('pg-salah','salah',O.salah,'radio');
  renderReliScale('reli-self','selfReli');
  renderPills('pg-hijab','hijab',O.hijab,'radio');
  renderPills('pg-beard','beard',O.beard,'radio');
  renderPills('pg-mothertongue','motherTongue',O.motherTongue,'radio');
  renderPills('pg-languages','languages',O.languagesSpoken,'checkbox');
  renderPills('pg-hobbies','hobbies',O.hobbies,'checkbox');
  renderPills('pg-timeline','timeline',O.timeline,'radio');
  renderPills('pg-relocation','relocation',O.relocation,'radio');
  renderPills('pg-wantchildren','wantChildren',O.wantChildren,'radio');
  renderPills('pg-familystructure','familyStructure',O.familyStructure,'radio');
  renderPills('pg-waliinvolved','waliInvolved',O.yesNo,'radio');
  renderPills('pg-whosearching','whoSearching',O.whoSearching,'radio');

  renderSelect('f-income',O.income,{en:'— select a range —',hi:'— एक श्रेणी चुनें —'});
  renderSelect('f-education',O.education,{en:'— select —',hi:'— चुनें —'});
  renderSelect('f-country',O.country,{en:'— select country —',hi:'— देश चुनें —'});

  // DOB
  const dEl=$('f-dob-day'), mEl=$('f-dob-month'), yEl=$('f-dob-year');
  dEl.innerHTML=''; mEl.innerHTML=''; yEl.innerHTML='';
  const dPh=document.createElement('option'); dPh.value=''; dPh.dataset.en='Day'; dPh.dataset.hi='दिन'; dPh.textContent=optLabel({en:'Day',hi:'दिन'}); dEl.appendChild(dPh);
  for(let d=1;d<=31;d++){ const o=document.createElement('option'); o.value=d; o.textContent=d; dEl.appendChild(o); }
  const months=[{en:'January',hi:'जनवरी'},{en:'February',hi:'फ़रवरी'},{en:'March',hi:'मार्च'},{en:'April',hi:'अप्रैल'},{en:'May',hi:'मई'},{en:'June',hi:'जून'},{en:'July',hi:'जुलाई'},{en:'August',hi:'अगस्त'},{en:'September',hi:'सितंबर'},{en:'October',hi:'अक्टूबर'},{en:'November',hi:'नवंबर'},{en:'December',hi:'दिसंबर'}];
  const mPh=document.createElement('option'); mPh.value=''; mPh.dataset.en='Month'; mPh.dataset.hi='महीना'; mPh.textContent=optLabel({en:'Month',hi:'महीना'}); mEl.appendChild(mPh);
  months.forEach((mo,i)=>{ const o=document.createElement('option'); o.value=i+1; o.dataset.en=mo.en; o.dataset.hi=mo.hi; o.textContent=optLabel(mo); mEl.appendChild(o); });
  const yPh=document.createElement('option'); yPh.value=''; yPh.dataset.en='Year'; yPh.dataset.hi='वर्ष'; yPh.textContent=optLabel({en:'Year',hi:'वर्ष'}); yEl.appendChild(yPh);
  const now=new Date().getFullYear();
  for(let y=now-18;y>=now-70;y--){ const o=document.createElement('option'); o.value=y; o.textContent=y; yEl.appendChild(o); }

  buildHeightSelects('f-height-ft','f-height-cm');
  buildStateSelect('f-state');
}

function populateFeetOptions(ftEl){
  ftEl.innerHTML='';
  const ftPh=document.createElement('option'); ftPh.value=''; ftPh.dataset.en='Feet'; ftPh.dataset.hi='फ़ीट'; ftPh.textContent=optLabel({en:'Feet',hi:'फ़ीट'}); ftEl.appendChild(ftPh);
  for(let totalIn=48; totalIn<=75; totalIn+=1){ // 4'0" (48in) to 6'3" (75in)
    const ft=Math.floor(totalIn/12), inch=totalIn%12;
    const o=document.createElement('option'); o.value=totalIn; o.textContent=`${ft}ft ${inch}in`;
    ftEl.appendChild(o);
  }
  const ftPlus=document.createElement('option'); ftPlus.value='76'; ftPlus.textContent="6ft 3in+"; ftEl.appendChild(ftPlus);
}

function populateCmOptions(cmEl){
  cmEl.innerHTML='';
  const cmPh=document.createElement('option'); cmPh.value=''; cmPh.dataset.en='cm'; cmPh.dataset.hi='सेमी'; cmPh.textContent=optLabel({en:'cm',hi:'सेमी'}); cmEl.appendChild(cmPh);
  for(let c=140;c<=195;c+=1){ const o=document.createElement('option'); o.value=c; o.textContent=c+'cm'; cmEl.appendChild(o); }
  const cmPlus=document.createElement('option'); cmPlus.value='196'; cmPlus.textContent='195cm+'; cmEl.appendChild(cmPlus);
}

/* Self height: paired feet + cm dropdowns, kept in sync */
function buildHeightSelects(ftId,cmId){
  populateFeetOptions($(ftId));
  populateCmOptions($(cmId));
}

/* Partner height range: both ends use the same unit (feet) per spec */
function buildFeetRangeSelects(minId,maxId){
  populateFeetOptions($(minId));
  populateFeetOptions($(maxId));
}

function buildStateSelect(id){
  renderSelect(id,O.states,{en:'— select state —',hi:'— राज्य चुनें —'});
}

function populateSubsect(selectId, sect){
  const list = SUBSECTS[sect];
  if(!list) return;
  renderSelect(selectId, list, {en:'— select —',hi:'— चुनें —'});
}

function buildPart2(){
  renderPills('pg-pgender','pgender',O.gender,'radio');
  renderPills('pg-psect','psect',O.psect,'radio');
  renderPills('pg-pmadhhab','pmadhhab',O.pmadhhab,'radio');
  renderPills('pg-psalah','psalah',O.psalah,'radio');
  renderReliScale('reli-partner','partnerReli');
  renderPills('pg-phijab','phijab',O.phijab,'radio');
  renderPills('pg-pbeard','pbeard',O.pbeard,'radio');
  renderPills('pg-pmarital','pmarital',O.pmarital,'radio');
  renderPills('pg-pchildren','pchildren',O.pchildren,'radio');
  renderPills('pg-pemployment','pemployment',O.pemployment,'radio');
  renderPills('pg-prelocate','prelocate',O.prelocate,'radio');
  renderPills('pg-livingarrangement','livingArrangement',O.livingArrangement,'radio');
  renderPills('pg-pwantchildren','pwantchildren',O.pwantchildren,'radio');
  renderPills('pg-ptimeline','ptimeline',O.ptimeline,'radio');
  renderPills('pg-pmothertongue','pmothertongue',O.pmotherTongue,'radio');
  renderPills('pg-pwali','pwali',O.pwali,'radio');

  renderSelect('f-peducation',O.peducation,{en:'— select —',hi:'— चुनें —'});
  renderSelect('f-pregion-country',O.country,{en:'— select country —',hi:'— देश चुनें —'});
  buildFeetRangeSelects('f-pheight-min','f-pheight-max');
}

function buildPart3(){
  renderPills('pg-hifz','hifz',O.hifz,'radio');
  renderPills('pg-quranreading','quranReading',O.quranReading,'radio');
  renderPills('pg-islamiceducation','islamicEducation',O.islamicEducation,'radio');
  renderPills('pg-lifestylegoals','lifestyleGoals',O.lifestyleGoals,'checkbox');
  renderPills('pg-studyislam','studyIslam',O.studyIslam,'radio');
  renderPills('pg-halaldiet','halalDiet',O.halalDiet,'radio');
  renderPills('pg-fasting','fasting',O.fasting,'radio');
  renderPills('pg-zakat','zakat',O.zakat,'radio');
  renderPills('pg-smoking','smoking',O.smoking,'radio');
  renderPills('pg-alcohol','alcohol',O.alcohol,'radio');
  renderPills('pg-halalentertainment','halalEntertainment',O.halalEntertainment,'radio');
  renderPills('pg-mixedgender','mixedGender',O.mixedGender,'radio');
  renderPills('pg-music','music',O.music,'radio');
  renderPills('pg-nafaqah','nafaqah',O.nafaqah,'radio');
  renderPills('pg-wifeworking','wifeWorking',O.wifeWorking,'radio');
  renderPills('pg-mahram','mahram',O.mahram,'radio');
  renderPills('pg-housing','housing',O.housing,'radio');
  renderPills('pg-mahroffer','mahrOffer',O.mahrCapacity,'radio');
  renderPills('pg-careerafter','careerAfter',O.careerAfter,'radio');
  renderPills('pg-proposalcontact','proposalContact',O.proposalContact,'radio');
  renderPills('pg-mahrexpectation','mahrExpectation',O.mahrCapacity,'radio');
  renderPills('pg-walirelationship','waliRelationship',O.waliRelationship,'radio');
  renderPills('pg-walidisplaytoggle','waliDisplayToggle',O.yesNo,'radio');
  renderPills('pg-walidisplayrelationship','waliDisplayRelationship',O.waliRelationship,'radio');
  renderPills('pg-walishowcontact','waliShowContact',O.yesNo,'radio');
  renderPills('pg-weddingtype','weddingType',O.weddingType,'radio');
  renderPills('pg-weddingrituals','weddingRituals',O.weddingRituals,'checkbox');
  renderPills('pg-parentingstyle','parentingStyle',O.parentingStyle,'radio');
}

buildPart1();
buildPart2();
buildPart3();
applyLanguage();
attachHeightSync('f-height-ft','f-height-cm');
setupCityAutocomplete();
setupNativePlaceAutocomplete();

/* ════ Height ft ↔ cm auto-sync ════ */
function attachHeightSync(ftId, cmId){
  const ftEl=$(ftId), cmEl=$(cmId);
  let syncing=false;
  ftEl.addEventListener('change', ()=>{
    if(syncing || !ftEl.value) return;
    syncing=true;
    const inches=+ftEl.value;
    const cm = inches>=76 ? 196 : Math.round(inches*2.54);
    cmEl.value = String(Math.min(Math.max(cm,140),196));
    syncing=false;
  });
  cmEl.addEventListener('change', ()=>{
    if(syncing || !cmEl.value) return;
    syncing=true;
    const cm=+cmEl.value;
    const inches = cm>=196 ? 76 : Math.round(cm/2.54);
    ftEl.value = String(Math.min(Math.max(inches,48),76));
    syncing=false;
  });
}

/* ════ City autocomplete (filtered by selected state) ════ */
let currentCityList = [];
function setupCityAutocomplete(){
  const inp=$('f-city'), drop=$('ac-city');
  let activeIdx=-1;
  function render(){
    const q=inp.value.trim().toLowerCase();
    const pool = currentCityList;
    const matches = q ? pool.filter(c=>c.toLowerCase().includes(q)) : pool;
    if(!matches.length){ drop.classList.add('hidden'); return; }
    drop.innerHTML = matches.map(m=>`<div class="ac-item" data-val="${m}">${m}</div>`).join('');
    drop.classList.remove('hidden'); activeIdx=-1;
  }
  inp.addEventListener('focus', render);
  inp.addEventListener('input', render);
  drop.addEventListener('mousedown', e=>{
    const item=e.target.closest('.ac-item');
    if(!item) return;
    e.preventDefault();
    inp.value=item.dataset.val;
    drop.classList.add('hidden');
    updateProgress();
  });
  inp.addEventListener('keydown', e=>{
    const items=[...drop.querySelectorAll('.ac-item')];
    if(!items.length) return;
    if(e.key==='ArrowDown'){ e.preventDefault(); activeIdx=Math.min(activeIdx+1,items.length-1); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); activeIdx=Math.max(activeIdx-1,0); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='Enter' && activeIdx>=0){ e.preventDefault(); inp.value=items[activeIdx].dataset.val; drop.classList.add('hidden'); updateProgress(); }
    else if(e.key==='Escape') drop.classList.add('hidden');
  });
  inp.addEventListener('blur', ()=>setTimeout(()=>drop.classList.add('hidden'),150));
}

/* ════ Native place autocomplete (OpenStreetMap Nominatim) ════ */
function setupNativePlaceAutocomplete(){
  const inp=$('f-nativeplace'), drop=$('ac-nativeplace');
  let activeIdx=-1, debounceTimer=null, lastQuery='';

  async function fetchSuggestions(q){
    try {
      const url=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=0`;
      const res=await fetch(url,{headers:{'Accept-Language':'en'}});
      if(!res.ok) return [];
      const data=await res.json();
      return data.map(d=>d.display_name);
    } catch(e){ return []; }
  }

  function renderDrop(items){
    if(!items.length){ drop.classList.add('hidden'); return; }
    drop.innerHTML=items.map(m=>`<div class="ac-item" data-val="${m.replace(/"/g,'&quot;')}">${m}</div>`).join('');
    drop.classList.remove('hidden'); activeIdx=-1;
  }

  inp.addEventListener('input', ()=>{
    const q=inp.value.trim();
    clearTimeout(debounceTimer);
    if(q.length<3){ drop.classList.add('hidden'); return; }
    if(q===lastQuery) return;
    debounceTimer=setTimeout(async ()=>{
      lastQuery=q;
      const results=await fetchSuggestions(q);
      if(inp.value.trim()===q) renderDrop(results);
    }, 350);
  });

  drop.addEventListener('mousedown', e=>{
    const item=e.target.closest('.ac-item');
    if(!item) return;
    e.preventDefault();
    inp.value=item.dataset.val;
    drop.classList.add('hidden');
    updateProgress();
  });

  inp.addEventListener('keydown', e=>{
    const items=[...drop.querySelectorAll('.ac-item')];
    if(!items.length) return;
    if(e.key==='ArrowDown'){ e.preventDefault(); activeIdx=Math.min(activeIdx+1,items.length-1); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); activeIdx=Math.max(activeIdx-1,0); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='Enter' && activeIdx>=0){ e.preventDefault(); inp.value=items[activeIdx].dataset.val; drop.classList.add('hidden'); updateProgress(); }
    else if(e.key==='Escape') drop.classList.add('hidden');
  });

  inp.addEventListener('blur', ()=>setTimeout(()=>drop.classList.add('hidden'),150));
}

/* ════ Conditional logic ════ */
document.addEventListener('change', e=>{
  const t = e.target;

  if(t.name==='marital'){
    (t.value==='divorced'||t.value==='widowed') ? show('field-children') : hide('field-children');
    t.value==='divorced' ? show('field-divorcedocs') : hide('field-divorcedocs');
    if(t.value!=='divorced' && t.value!=='widowed') hide('field-childrendetails');
  }
  if(t.name==='children'){
    const maritalOk = ['divorced','widowed'].includes(radioVal('marital'));
    (maritalOk && t.value==='yes') ? show('field-childrendetails') : hide('field-childrendetails');
  }
  if(t.name==='disability'){
    t.value==='yes' ? show('field-disabilitytype') : hide('field-disabilitytype');
  }
  if(t.name==='gender'){
    if(t.value==='female'){ show('field-hijab'); hide('field-beard'); }
    else if(t.value==='male'){ show('field-beard'); hide('field-hijab'); }
    syncPart3Gender();
    lockPartnerGender(t.value);
  }
  if(t.name==='pgender'){
    if(t.value==='male'){ show('field-phijab'); hide('field-pbeard'); }
    else if(t.value==='female'){ show('field-pbeard'); hide('field-phijab'); }
  }
  if(t.name==='registerAs'){
    const shouldShowWali = radioVal('registerAs')==='wali';
    shouldShowWali ? show('field-walidetails') : hide('field-walidetails');
  }
  if(t.name==='waliDisplayToggle'){
    t.value==='yes' ? show('field-walidisplaydetails') : hide('field-walidisplaydetails');
  }
  if(t.name==='weddingType'){
    t.value==='largeWedding' ? show('field-weddingrituals') : hide('field-weddingrituals');
  }
  if(t.name==='sect'){
    if(t.value==='sunni' || t.value==='shia'){
      populateSubsect('f-subsect', t.value);
      show('field-subsect');
    } else {
      hide('field-subsect');
      $('f-subsect').innerHTML='';
    }
  }
  if(t.name==='psect'){
    if(t.value==='sunni' || t.value==='shia'){
      populateSubsect('f-psubsect', t.value);
      show('field-psubsect');
    } else {
      hide('field-psubsect');
      $('f-psubsect').innerHTML='';
    }
  }
  if(t.id==='f-country'){
    const isIndia = t.value==='IN';
    isIndia ? show('field-state') : hide('field-state');
    isIndia ? show('field-city') : hide('field-city');
    currentCityList = [];
    $('f-city').value='';
  }
  if(t.id==='f-state'){
    currentCityList = CITIES_BY_STATE[t.value] || [];
    $('f-city').value='';
  }
  if(t.id==='f-pregion-any'){
    t.checked ? hide('pregion-selects') : show('pregion-selects');
    clearErr('err-pregion');
  }
  updateProgress();
});

document.addEventListener('input', e=>{
  const t=e.target;
  if(t.tagName==='INPUT' || t.tagName==='TEXTAREA') updateProgress();
});

function lockPartnerGender(ownGender){
  const opposite = ownGender==='male' ? 'female' : ownGender==='female' ? 'male' : '';
  if(!opposite) return;
  const oppInput = document.querySelector(`input[name="pgender"][value="${opposite}"]`);
  if(!oppInput) return;
  oppInput.checked = true;
  document.querySelectorAll('input[name="pgender"]').forEach(i=>i.disabled=true);
  $('pg-pgender').classList.add('locked');
  show('pgender-lock-note');
  clearErr('err-pgender');
  oppInput.dispatchEvent(new Event('change', {bubbles:true}));
}

function syncPart3Gender(){
  const g = radioVal('gender');
  if(g==='male'){ show('male-only-fields'); hide('female-only-fields'); }
  else if(g==='female'){ show('female-only-fields'); hide('male-only-fields'); }
  else { hide('male-only-fields'); hide('female-only-fields'); }
}

/* ════ Autocomplete (profession) ════ */
function makeProfessionAutocomplete(inputId, dropId){
  const inp=$(inputId), drop=$(dropId);
  let activeIdx=-1;
  function getList(){ return PROFESSIONS.map(p=>optLabel(p)); }
  inp.addEventListener('input', ()=>{
    const q=inp.value.trim().toLowerCase();
    if(!q){ drop.classList.add('hidden'); return; }
    const matches = getList().filter(p=>p.toLowerCase().includes(q)).slice(0,12);
    if(!matches.length){ drop.classList.add('hidden'); return; }
    drop.innerHTML = matches.map(m=>`<div class="ac-item" data-val="${m}">${m}</div>`).join('');
    drop.classList.remove('hidden'); activeIdx=-1;
  });
  drop.addEventListener('mousedown', e=>{
    const item=e.target.closest('.ac-item');
    if(!item) return;
    e.preventDefault();
    inp.value=item.dataset.val;
    drop.classList.add('hidden');
    updateProgress();
  });
  inp.addEventListener('keydown', e=>{
    const items=[...drop.querySelectorAll('.ac-item')];
    if(!items.length) return;
    if(e.key==='ArrowDown'){ e.preventDefault(); activeIdx=Math.min(activeIdx+1,items.length-1); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); activeIdx=Math.max(activeIdx-1,0); items.forEach((el,i)=>el.classList.toggle('active',i===activeIdx)); }
    else if(e.key==='Enter' && activeIdx>=0){ e.preventDefault(); inp.value=items[activeIdx].dataset.val; drop.classList.add('hidden'); updateProgress(); }
    else if(e.key==='Escape') drop.classList.add('hidden');
  });
  inp.addEventListener('blur', ()=>setTimeout(()=>drop.classList.add('hidden'),150));
}
makeProfessionAutocomplete('f-profession','ac-profession');
makeProfessionAutocomplete('f-pprofession','ac-pprofession');

/* ════ DOB age check ════ */
function getAge(){
  const d=val('f-dob-day'), m=$('f-dob-month').value, y=val('f-dob-year');
  if(!d||!m||!y) return null;
  const dob=new Date(+y,+m-1,+d);
  if(isNaN(dob)) return null;
  return Math.floor((Date.now()-dob)/(365.25*24*3600*1000));
}

/* ════ Part navigation ════ */
function setPart(n){
  hide('part1'); hide('part2'); hide('part3');
  show('part'+n);
  ['dot1','dot2','dot3'].forEach((id,i)=>{
    const d=$(id); d.className='step-dot';
    if(i+1<n) d.classList.add('done'); else if(i+1===n) d.classList.add('active');
  });
  currentPartNum = n;
  refreshPartLabel();
  window.scrollTo({top:0,behavior:'smooth'});
  updateProgress(n);
}

/* ════ Progress bar — band checkpoints per spec (0/46/80/100), blended with
   real fill-status inside the current part so it reads smoothly instead of
   jumping only at part transitions ════ */
const PROGRESS_BANDS = {1:[0,46], 2:[46,80], 3:[80,100]};

function fieldFilled(fieldEl){
  const radios = fieldEl.querySelectorAll('input[type="radio"]');
  if(radios.length) return [...radios].some(r=>r.checked);
  const checks = fieldEl.querySelectorAll('input[type="checkbox"]');
  if(checks.length) return [...checks].some(c=>c.checked);
  const textlike = fieldEl.querySelectorAll('input[type="text"],input[type="number"],textarea,select');
  if(textlike.length) return [...textlike].every(el=>el.value && el.value.trim()!=='');
  return false;
}

function computePartFillRatio(partId){
  const partEl=$(partId);
  if(!partEl) return 0;
  const fields=[...partEl.querySelectorAll('.field')].filter(f=>!f.classList.contains('hidden') && !f.parentElement.closest('.hidden'));
  if(!fields.length) return 0;
  const filledCount = fields.filter(fieldFilled).length;
  return filledCount/fields.length;
}

function updateProgress(target){
  let pct;
  if(target==='done'){
    pct=100;
  } else {
    const n = typeof target==='number' ? target : currentPartNum;
    const [lo,hi] = PROGRESS_BANDS[n] || [0,46];
    const ratio = computePartFillRatio('part'+n);
    pct = Math.round(lo + ratio*(hi-lo));
  }
  $('prog-fill').style.width=pct+'%';
  $('pct-label').textContent=pct+'%';
}

/* ════ Validation & navigation ════ */
function validateFullName(){
  const v = val('f-name');
  const words = v.trim().split(/\s+/).filter(w=>w.length>0);
  const ok = words.length >= 2 && v.trim().length >= 4;
  ok ? clearErr('err-name') : showErr('err-name');
  if(!ok) $('f-name').classList.add('error'); else $('f-name').classList.remove('error');
  return ok;
}
$('f-name').addEventListener('input', ()=>{ if($('err-name').classList.contains('show')) validateFullName(); });

$('p1-next').addEventListener('click', ()=>{ if(!validateFullName()) return; setPart(2); });

$('p2-back').addEventListener('click', ()=>setPart(1));
$('p2-next').addEventListener('click', ()=>setPart(3));

$('p3-back').addEventListener('click', ()=>setPart(2));
$('p3-submit').addEventListener('click', ()=>submitForm());

/* ════ Submit & summary ════ */
function submitForm(){
  updateProgress('done');
  buildSummary();
  $('form-card').classList.add('hidden');
  $('done-card').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
  clearDraft();
}

function optText(setName,v){
  const arr = O[setName];
  if(!arr) return v;
  const found = arr.find(o=>o.v===v);
  return found ? optLabel(found) : v;
}

function buildSummary(){
  const age=getAge();
  const rows=[
    ['__'+(LANG==='hi'?'व्यक्तिगत':'Personal')],
    [T.lblName[LANG], val('f-name')||'—'],
    [T.lblRegisterAs[LANG], optText('registerAs',radioVal('registerAs'))||'—'],
    [T.lblDob[LANG], age!==null?`${val('f-dob-day')}/${$('f-dob-month').value}/${val('f-dob-year')} (${age})`:'—'],
    [T.lblGender[LANG], optText('gender',radioVal('gender'))||'—'],
    [T.lblMarital[LANG], optText('marital',radioVal('marital'))||'—'],
    [T.lblSect[LANG], optText('sect',radioVal('sect'))||'—'],
    [T.lblProfession[LANG], val('f-profession')||'—'],
    [T.lblEducation[LANG], optText('education',val('f-education'))||'—'],
    [T.lblCountry[LANG], optText('country',val('f-country'))||'—'],
    ['__'+(LANG==='hi'?'वांछित साथी':'Partner Sought')],
    [T.lblPGender[LANG], optText('gender',radioVal('pgender'))||'—'],
    [T.lblPAge[LANG], (val('f-page-min')&&val('f-page-max'))?`${val('f-page-min')} – ${val('f-page-max')}`:'—'],
    [T.lblPSect[LANG], optText('psect',radioVal('psect'))||'—'],
    [T.lblLivingArrangement[LANG], optText('livingArrangement',radioVal('livingArrangement'))||'—'],
    ['__'+(LANG==='hi'?'धार्मिक प्राथमिकताएं':'Religious Preferences')],
    [T.lblSmoking[LANG], optText('smoking',radioVal('smoking'))||'—'],
    [T.lblAlcohol[LANG], optText('alcohol',radioVal('alcohol'))||'—'],
  ];
  const grid=$('summary-grid');
  grid.innerHTML='';
  rows.forEach(row=>{
    if(row[0].startsWith('__')){
      const el=document.createElement('div'); el.className='sg-section'; el.textContent=row[0].slice(2);
      grid.appendChild(el);
    } else {
      const k=document.createElement('div'); k.className='sg-k'; k.textContent=row[0];
      const v=document.createElement('div'); v.className='sg-v'; v.textContent=row[1];
      grid.appendChild(k); grid.appendChild(v);
    }
  });
}

$('restart-btn').addEventListener('click', ()=>{ clearDraft(); location.reload(); });

/* ════ Toast ════ */
function showToast(msg, dur){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(()=>t.classList.remove('show'), dur||3500);
}

/* ════ Save & Resume (localStorage — this prototype has no backend) ════ */
const DRAFT_KEY = 'nikahFormDraft';

function clearDraft(){
  try { localStorage.removeItem(DRAFT_KEY); } catch(e){}
}

function collectFormData(){
  const root = $('form-card');
  const data = { text:{}, radio:{}, checkbox:{}, part: currentPartNum, lang: LANG };
  root.querySelectorAll('input[type="text"], input[type="number"], textarea, select').forEach(el=>{
    if(el.id) data.text[el.id] = el.value;
  });
  root.querySelectorAll('input[type="radio"]:checked').forEach(el=>{
    data.radio[el.name] = el.value;
  });
  root.querySelectorAll('input[type="checkbox"]').forEach(el=>{
    if(el.id === 'f-pregion-any') return;
    if(el.checked){
      if(!data.checkbox[el.name]) data.checkbox[el.name] = [];
      data.checkbox[el.name].push(el.value);
    }
  });
  data.pregionAny = $('f-pregion-any').checked;
  return data;
}

function saveDraft(){
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(collectFormData()));
    showToast(T.savedToast[LANG]);
    const status = $('save-status');
    const now = new Date();
    status.textContent = (LANG==='hi' ? 'अंतिम बार सहेजा गया: ' : 'Last saved: ') + now.toLocaleTimeString();
    status.classList.remove('hidden');
  } catch(e){ /* localStorage unavailable — silently ignore in this prototype */ }
}

function reapplyConditionalVisibility(){
  const marital = radioVal('marital');
  (marital==='divorced'||marital==='widowed') ? show('field-children') : hide('field-children');
  marital==='divorced' ? show('field-divorcedocs') : hide('field-divorcedocs');

  const maritalOk = ['divorced','widowed'].includes(marital);
  (maritalOk && radioVal('children')==='yes') ? show('field-childrendetails') : hide('field-childrendetails');

  radioVal('disability')==='yes' ? show('field-disabilitytype') : hide('field-disabilitytype');

  const gender = radioVal('gender');
  if(gender==='female'){ show('field-hijab'); hide('field-beard'); }
  else if(gender==='male'){ show('field-beard'); hide('field-hijab'); }
  syncPart3Gender();
  if(gender) lockPartnerGender(gender);

  const shouldShowWali = radioVal('registerAs')==='wali';
  shouldShowWali ? show('field-walidetails') : hide('field-walidetails');

  radioVal('waliDisplayToggle')==='yes' ? show('field-walidisplaydetails') : hide('field-walidisplaydetails');

  const pgender = radioVal('pgender');
  if(pgender==='male'){ show('field-phijab'); hide('field-pbeard'); }
  else if(pgender==='female'){ show('field-pbeard'); hide('field-phijab'); }

  const sect = radioVal('sect');
  if(sect==='sunni' || sect==='shia'){
    populateSubsect('f-subsect', sect);
    show('field-subsect');
  } else { hide('field-subsect'); }

  const psect = radioVal('psect');
  if(psect==='sunni' || psect==='shia'){
    populateSubsect('f-psubsect', psect);
    show('field-psubsect');
  } else { hide('field-psubsect'); }

  const isIndia = val('f-country')==='IN';
  isIndia ? show('field-state') : hide('field-state');
  isIndia ? show('field-city') : hide('field-city');
  if(val('f-state')) currentCityList = CITIES_BY_STATE[val('f-state')] || [];

  $('f-pregion-any').checked ? hide('pregion-selects') : show('pregion-selects');

  radioVal('weddingType')==='largeWedding' ? show('field-weddingrituals') : hide('field-weddingrituals');

}

function restoreDraft(){
  let raw;
  try { raw = localStorage.getItem(DRAFT_KEY); } catch(e){ return false; }
  if(!raw) return false;
  let data;
  try { data = JSON.parse(raw); } catch(e){ return false; }

  if(data.lang){ LANG = data.lang; applyLanguage(); }

  Object.entries(data.text||{}).forEach(([id,v])=>{ const el=$(id); if(el) el.value = v; });
  Object.entries(data.radio||{}).forEach(([name,v])=>{
    const el = document.querySelector(`input[name="${name}"][value="${CSS.escape(v)}"]`);
    if(el) el.checked = true;
  });
  Object.entries(data.checkbox||{}).forEach(([name,vals])=>{
    vals.forEach(v=>{
      const el = document.querySelector(`input[name="${name}"][value="${CSS.escape(v)}"]`);
      if(el) el.checked = true;
    });
  });
  if(data.pregionAny) $('f-pregion-any').checked = true;

  // Subsect / preferred-subsect dropdowns get rebuilt by reapplyConditionalVisibility,
  // so re-apply their saved values afterwards.
  reapplyConditionalVisibility();
  if(data.text['f-subsect']) $('f-subsect').value = data.text['f-subsect'];
  if(data.text['f-psubsect']) $('f-psubsect').value = data.text['f-psubsect'];

  setPart(data.part || 1);
  showToast(T.resumedToast[LANG], 4000);
  return true;
}

$('save-exit-btn').addEventListener('click', saveDraft);

restoreDraft();
updateProgress(1);
