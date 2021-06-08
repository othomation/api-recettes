const html = `<!-- Une API réalisée avec amour ! -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    h1 {
      margin: 0;
    }

    h2 {
      font-size: 0.5em;
    }

    body {
      background-image: url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80');
      background-size: cover;
      font-family: sans-serif;
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-content: center;
    }

    header {
      text-align: center;
    }

    section {
      background-color: white;
      padding: 1em;
      border-radius: 0.4em;
      box-shadow: 0px 0 12px 0px #707070;
    }

    ul {
      list-style: circle;
      padding-left: 0.8em;
    }
  </style>
  <body>
    <section>
      <header>
        <h1>API RECETTES</h1>
        <h2>Une petite api faite avec amour 💕😻</h2>
      </header>
      <article>
        <ul>
          <li>
            <a
              href="/swagger"
              title="Aller sur la documentation et zone de test"
              >API Documentation</a
            >
          </li>
          <li>
            <a
              href="https://github.com/othomation/api-recettes"
              title="Recuperer le code source"
              >Sources</a
            >
          </li>
        </ul>
      </article>
    </section>
  </body>
</html>
`;
export default html;
