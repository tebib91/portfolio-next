

// Map technology names to icons
export const techIconMap: Record<string, string> = {
  // Languages
  TypeScript: '/icons/typescript.png',
  JavaScript: '/icons/javascript.png',
  HTML: '/icons/html.png',
  SCSS: '/icons/scss.svg',
  Python: '/icons/python.png',
  XML: '/icons/xml.png',
  YAML: '/icons/yaml.png',

  // Frameworks
  Angular: '/icons/angular.png',
  ReactJS: '/icons/react.png',
  React: '/icons/react.png',
  NodeJS: '/icons/nodejs.png',
  NestJS: '/icons/nestjs.png',
  ExpressJS: '/icons/express.png',

  // DevOps
  Docker: '/icons/docker.png',
  Kubernetes: '/icons/kubernetes.png',
  Kubectl: '/icons/kubernetes.png',
  GitLab: '/icons/gitlab.png',
  GitHub: '/icons/github.png',
  Jenkins: '/icons/jenkins.png',
  SonarQube: '/icons/sonarqube.png',
  Octoperf: '/icons/octoperf.svg',

  // DB
  MongoDB: '/icons/mongodb.png',
  DynamoDB: '/icons/mongodb.png',
  PostgreSQL: '/icons/postgresql.png',
  Redis: '/icons/redis.png',

  // Cloud
  AWS: '/icons/aws.svg',
  "AWS Lambda": '/icons/aws.png',
  GCP: '/icons/gcp.png',
  CloudWatch: '/icons/aws.png',

  // Testing
  RobotFramework: '/icons/robotframework.svg',
  TDD: '/icons/tdd.png',
  BDD: '/icons/bdd.png',
  Selenium: '/icons/selenium.png',
  Jest: '/icons/jest.png'
};

// Default icon for technologies without specific mapping
export const DefaultTechIcon = '/icons/default.png';