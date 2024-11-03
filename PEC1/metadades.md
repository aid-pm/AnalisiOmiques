## 1. Descripció 
Aquest conjunt de dades conté informació metabòlica de mostres biològiques analitzades per comparar diferents tipus de pacients. 
Les mostres inclouen pacients amb càncer gàstric (GC), pacients amb malaltia gàstrica benigna (BN) i individus sans (HE). Les dades 
proporcionades NO estan normalitzades ni filtrades per qualitat, això s'ha fet al present estudi. El conjunt de dades es va 
utilitzar per al tutorial ["Basic Metabolomics Data Analysis Workflow"](https://cimcb.github.io/MetabWorkflowTutorial/Tutorial1.html).
El fitxer de dades desconvolucionat i anotat s'ha dipositat al dipòsit de dades de Metabolomics Workbench (ID del projecte PR000699).
 _Dades_: les dades originals utilitzades estan disponibles a DOI:10.21228/M8B10B 

## 2. Origen de les dades
- **Font**: L'estudi del tutorial es pot trobar d'accès obert a Chan _et al._ (2016), al _British Journal of Cancer_.
- **Data i lloc de recollida**: Gener 2009 a Desembre 2014, a tres hospitals a Edmonton, Canadà. 
- **Mètode d'obtenció**: Es van recollir mostres d'orina de 43 pacients GC, 40 BN i 40 HE. Per les de GC, es van recollir abans de la
quimioradioteràpia i la cirurgia. Els espectres de 1HRMN es van adquirir al Canada’s National High Field Nuclear Magnetic Resonance Centre
(NANUC) del Canadà mitjançant un espectròmetre Varian Inova de 600 MHz. La deconvolució espectral i l'anotació de metabòlits es van realitzar
mitjançant Chenomx NMR Suite v7.6.

## 3. Contingut de les dades
Tenim un arxiu principal amb l'expressió de 140 metabolits per mostra, on està un identificador de mostra (Sample ID), el tipus de mostra 
(SampleType: control de qualitat o mostra normal) i la classe de pacient (Class: control de qualitat, GC, BN i HE). Després tenim un arxiu peak 
amb informació de cada metabolit, un index de metabolits (Idx), el nom MX utilitzat (Name), el nom científic d'aquest (Label), així com 
el percentatge de missings (Perc_missing) i la mesura de la desviació estàndard relativa de qualitat en percentatge (QC_RSD).
