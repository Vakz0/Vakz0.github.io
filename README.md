# vakz0.github.io

Portfolio data de Bastien Guillemin, élève ingénieur à l'INSA Lyon.
Site statique bilingue (FR/EN), en ligne sur <https://vakz0.github.io>.

## Stack

- Next.js 16 (App Router) en export statique, `output: "export"`
- TypeScript, Tailwind CSS v4
- Motion pour les animations, Phosphor pour les icônes
- Déploiement automatique sur GitHub Pages via GitHub Actions

## Développement

```bash
npm install
npm run dev     # http://localhost:3000/fr/
npm run build   # export statique dans ./out
npm run lint
```

Pour ajouter une image : dépose le PNG ou le JPEG dans `public/images`, puis lance
`npm run images`. Le script le redimensionne, le convertit en WebP et supprime la
source. Sans cette étape, une image de plusieurs mégaoctets serait servie telle
quelle, puisque l'export statique n'optimise rien à la volée.

L'export statique n'a pas de serveur : pas de route API, pas de middleware,
et les images sont servies sans optimisation Next.

## Ajouter ou compléter un projet

Tout le contenu des projets vit dans [`src/content/projects.ts`](src/content/projects.ts).
Le type `ProjectCopy` impose la narration attendue par un recruteur data :

| Champ      | Ce qu'il contient                                          |
| ---------- | ---------------------------------------------------------- |
| `question` | La question métier à laquelle le projet répond              |
| `data`     | La source, le volume, et ce qui est sale dans les données   |
| `method`   | Le traitement et les arbitrages de modélisation             |
| `findings` | Les résultats chiffrés. Vide tant que l'analyse est en cours |
| `limits`   | Ce que l'analyse ne peut pas prouver                        |

Tant que `findings` est vide et que `status` vaut `"in-progress"`, la fiche
affiche une mention honnête plutôt qu'un résultat inventé. Pour publier un
projet, on remplit `findings` et on passe `status` à `"published"`.

Les traductions d'interface sont dans [`src/content/i18n.ts`](src/content/i18n.ts).

## Déploiement

Chaque push sur `main` déclenche
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) : lint, vérification
des types, build, puis publication de `./out` sur GitHub Pages.

La source Pages doit être réglée sur **GitHub Actions** dans les paramètres du dépôt.
