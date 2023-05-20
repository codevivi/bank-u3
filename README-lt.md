# Bankas ver. 3

(Banko aplikacijos versija su autorizacija)

Banką sudaro du puslapiai su bendru meniu ir prisijungimo puslapis

**Pirmame puslapyje (home) pateikta bendra informacija apie banką**:

- [x] klientų skaičius ir bendra laikoma suma.

- [x] Taip pat patalpinti kažkokie grafiniai elementai, užpildantys puslapį.

- [x] Į šį puslapį gali patekti ir prisijungę ir neprisijungę vartotojai.

**Antrame puslapyje yra**:

- [x] Sąskaitų sąrašas su Vardu, Pavarde, Sąskaitos suma, Mygtuku “ištrinti”, laukeliu vertei įrašyti ir dviem mygtukais tam laukeliui: “pridėti lėšų” ir “nuskaičiuoti lėšas”

- [x] Naujos sąskaitos sukūrimas (įvedami duomenys: vardas ir pavardė)

- [x] Puslapio viršuje atvaizduojama statistika: klientų skaičius ir bendra laikoma suma.

- [x] Nauja sąskaita sukuriama su pradine 0 suma, o lėšos pridedamos/nuimamos sąraše įvedant sumą ir spaudžiant atitinkamą mygtuką.

- [x] Sąskaitos, kurioje yra lėšų ištrinti neturi būti galima.

- [x] Sąskaitas saraše rūšiuoti pagal savininko pavardę.

- [x] Sąskaitoje likusi suma negali būti minusinė. Rodomas klaidos pranešimas bandant nuskaičiuoti daugiau nei yra.

- [x] Duomenų bazė - Express serveris su JSON failu.

- [x] Po kiekvienos įrašymo (trynimo) operacijos turi būti parodomas pranešimas apie operacijos rezultatus.

- [x] Padaryti filtravimą, kuris parodytų tučiasias sąskaitas ir sąskaitas turinčias lėšų.

- [x] Į šį puslapį gali patekti tik prisijungę vartotojai. Bandant patekti neprisijungusiam vartotojui, jis turi būti nukreipiamas į prisijungimo puslapį.

**Prisijungimo puslapis**:

- [x] meniu neturi.

- [x] Vartotojai (vardas ir slaptažodžio hash) rankiniu būdu surašyti į JSON failą patalpintą Express serveryje (Kacius, kacius@pele.lt : Kacius123; Pelius, pelius@pele.lt:Pelius123).

- [x] Meniu keičiasi priklausomai ar puslapyje yrra prisijungęs vartotojas ar ne. Prisijungusiam vartotojui meniu yra rodomas atsijungimo mygtukas ir jo vardas, o neprisijungusiam- linkas į prisijungimo puslapį.
