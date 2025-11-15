// Map technology names to their official websites
export const techWebsites: Record<string, string> = {
  // Languages
  TypeScript: "https://www.typescriptlang.org/",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  HTML: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  SCSS: "https://sass-lang.com/",
  Python: "https://www.python.org/",
  XML: "https://www.w3.org/XML/",
  YAML: "https://yaml.org/",

  // Frameworks
  Angular: "https://angular.io/",
  "Angular2+": "https://angular.io/",
  "Angular 6": "https://angular.io/",
  "Angular 8": "https://angular.io/",
  "Angular 10": "https://angular.io/",
  "Angular 13": "https://angular.io/",
  "Angular 19": "https://angular.io/",
  ReactJS: "https://react.dev/",
  React: "https://react.dev/",
  NodeJS: "https://nodejs.org/",
  NestJS: "https://nestjs.com/",
  ExpressJS: "https://expressjs.com/",
  Express: "https://expressjs.com/",

  // Databases
  MongoDB: "https://www.mongodb.com/",
  DynamoDB: "https://aws.amazon.com/dynamodb/",
  PostgreSQL: "https://www.postgresql.org/",
  Redis: "https://redis.io/",

  // Cloud
  AWS: "https://aws.amazon.com/",
  "AWS Lambda": "https://aws.amazon.com/lambda/",
  GCP: "https://cloud.google.com/",
  CloudWatch: "https://aws.amazon.com/cloudwatch/",

  // DevOps
  Docker: "https://www.docker.com/",
  Kubernetes: "https://kubernetes.io/",
  Kubectl: "https://kubernetes.io/docs/reference/kubectl/",
  GitLab: "https://about.gitlab.com/",
  GitHub: "https://github.com/",
  Jenkins: "https://www.jenkins.io/",
  SonarQube: "https://www.sonarsource.com/products/sonarqube/",
  Octoperf: "https://octoperf.com/",

  // Testing
  RobotFramework: "https://robotframework.org/",
  TDD: "https://en.wikipedia.org/wiki/Test-driven_development",
  BDD: "https://en.wikipedia.org/wiki/Behavior-driven_development",
  Selenium: "https://www.selenium.dev/",
  Jest: "https://jestjs.io/",

  // Other
  RxJS: "https://rxjs.dev/",
  NX: "https://nx.dev/",
  ElectronJS: "https://www.electronjs.org/",
  WebSocket: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket",
  Lambda: "https://aws.amazon.com/lambda/",
  DataDog: "https://www.datadoghq.com/",
  "Architecture Hexagonale": "https://alistair.cockburn.us/hexagonal-architecture/",
  "SHAKA Player": "https://shaka-player-demo.appspot.com/",
  "Akita Store": "https://datorama.github.io/akita/",
  Bootstrap4: "https://getbootstrap.com/docs/4.6/getting-started/introduction/",
  ChartJs: "https://www.chartjs.org/",
  Stripe: "https://stripe.com/",
  "Signal R": "https://dotnet.microsoft.com/apps/aspnet/signalr",
  SEO: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
};

// Default website if technology not found
export const getTechWebsite = (tech: string): string => {
  return techWebsites[tech] || `https://www.google.com/search?q=${encodeURIComponent(tech)}`;
};

