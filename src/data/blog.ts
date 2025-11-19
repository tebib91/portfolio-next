import { BlogPost } from "@/app/api/blog/data";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "sncf-voyageurs-digital-transformation",
    title: "Leading Digital Transformation at SNCF: Building the Future of TGV Maintenance",
    description: "How we architected a microservices ecosystem to revolutionize maintenance operations for France's high-speed trains",
    content: `When I joined **SNCF Voyageurs** in March 2024, the challenge was clear: transform decades of maintenance operations into a modern, digital-first system. The **SPID Program** wasn't just another project—it was about reimagining how France's iconic TGV trains are maintained.

**The Challenge**

The existing system was a patchwork of manual processes and legacy applications. Maintenance scheduling, tracking, and execution were fragmented across multiple systems. We needed to build something that could handle the complexity of TGV maintenance while being intuitive enough for daily use by maintenance teams.

**Architecting for Scale**

From day one, I knew this required a **microservices architecture**. We chose **NestJS** as our framework, deployed on **Kubernetes** for orchestration. But the real innovation came with our communication layer—**Kafka** became the nervous system of our platform, enabling real-time event-driven communication between services.

The architecture consisted of two core applications:
- **ProgOne**: Managing maintenance appointments and the complete maintenance lifecycle
- **H00**: Handling milestones, slot management, and temporal planning

**The Connector System**

One of my proudest achievements was designing the **connector system**. We needed real-time detection of MongoDB changes across the platform. Instead of scattered writes, I architected a centralized write service called **Persist**. This microservice became the single source of truth for all data modifications, ensuring data consistency and enabling powerful audit trails.

**Frontend Excellence**

On the frontend, we leveraged the latest **Angular** version to build intuitive interfaces for operational monitoring and control. The screens needed to be fast, responsive, and provide real-time feedback to maintenance teams working on the ground.

**DevOps Culture**

I established comprehensive **CI/CD pipelines** using **GitHub Actions**, implemented rigorous code review processes, and set up monitoring dashboards. Quality wasn't an afterthought—it was built into every step of our development process.

**The Impact**

Today, maintenance teams across France use our platform daily. What used to take hours of manual coordination now happens in minutes. The system processes thousands of maintenance events daily, and the Kafka-based architecture ensures everything stays in sync in real-time.

**Key Takeaways**

Building large-scale systems requires more than technical skills. It demands understanding the domain, collaborating with stakeholders, and making architectural decisions that will stand the test of time. The SPID Program taught me that the best technology is the one that solves real problems for real people.`,
    image: "/images/sncf-voyageurs.webp",
    tags: ["NestJS", "Angular", "Kafka", "Kubernetes", "MongoDB", "Microservices", "Architecture"],
    date: "2024-03-15T00:00:00.000Z"
  },
  {
    id: "2",
    slug: "asn-legacy-modernization",
    title: "From Legacy to Modern: Migrating Kraken to the Cloud Era",
    description: "A 3-month sprint to transform an offline-first application into a modern GraphQL-powered platform",
    content: `Three months. That's all we had to migrate **Kraken**, ASN's critical online/offline application, to a modern technology stack. The pressure was on, but so was the opportunity to do things right.

**Understanding the Beast**

Kraken was a complex beast—an application that needed to work both online and offline, syncing data when connectivity returned. It was built years ago with technologies that, while solid at the time, were showing their age. MongoDB was the database, but everything else needed a complete overhaul.

**The Modern Stack**

We chose a powerful combination:
- **NestJS** for the backend—its modular architecture and TypeScript-first approach made it perfect for building maintainable APIs
- **GraphQL** for data fetching—giving the frontend exactly the data it needed, nothing more, nothing less
- **Angular** (latest version) for the UI—providing a robust framework for building complex interfaces

**The BID Platform**

Beyond Kraken, we were also building the next generation of offer management tools—the **BID platform**. This was greenfield development, and we made sure to implement best practices from day one.

**CI/CD from Day One**

I'm a firm believer that CI/CD isn't something you add later—it's foundational. We implemented **GitHub Actions** pipelines that ran tests, performed code quality checks, and deployed automatically to staging environments. Every pull request was validated before it could touch the main branch.

**The Offline Challenge**

The trickiest part? Maintaining the offline-first capability while modernizing the stack. We implemented a robust caching strategy and conflict resolution system. When connectivity returned, the application would intelligently sync changes, handling conflicts gracefully.

**Jira as Our Command Center**

With such a tight timeline, tracking was crucial. We used **Jira** religiously—every bug, every feature, every blocker was tracked. Daily standups were focused and data-driven. We knew exactly where we stood at any moment.

**Lessons in Velocity**

Three months taught me that speed doesn't mean cutting corners. It means:
- Clear requirements upfront
- Daily communication with stakeholders
- Automated testing to catch issues early
- Pragmatic technical decisions that balance ideal with achievable

**The Result**

We delivered on time. The new Kraken was faster, more maintainable, and ready for the next decade. The BID platform launched successfully, giving ASN's teams modern tools to manage their offers effectively.

**Key Takeaway**

Legacy migration isn't about rewriting code—it's about understanding the domain, respecting what worked in the old system, and bringing those lessons into the modern era. And sometimes, tight deadlines bring out the best in a team.`,
    image: "/images/asn.png",
    tags: ["NestJS", "Angular", "GraphQL", "MongoDB", "CI/CD", "Legacy Migration"],
    date: "2023-11-20T00:00:00.000Z"
  },
  {
    id: "3",
    slug: "sncf-connect-real-time-passenger-information",
    title: "Building LIVE Solution: Real-Time Information for Millions of Travelers",
    description: "How we built a serverless, real-time system that keeps French train passengers informed across major stations",
    content: `Every day, millions of passengers pass through French train stations. They need one thing above all: **accurate, real-time information**. That's what **LIVE Solution** delivers, and I had the privilege of helping build it at **SNCF Connect**.

**The Scale of the Challenge**

Imagine building a system that needs to:
- Process thousands of real-time updates per minute
- Display information across hundreds of screens in major stations
- Handle peak loads during rush hour
- Never go down (seriously, never)

That was our mandate. And we built it on **AWS**, using a **serverless architecture** that could scale automatically.

**The Architecture**

We chose **AWS Lambda** for compute—functions that spin up on demand and scale automatically. **TypeScript** was our language of choice, bringing type safety to our serverless functions. The frontend was built with **React**, creating responsive interfaces for multiple types of displays.

**Working in a SAFe Environment**

This wasn't a small team project. We had **42 developers** organized into **6 squads**. I worked within the SAFe framework, participating in PI planning, sprint reviews, and continuous delivery. Coordination was key—one squad's work often depended on another's.

**The Testing Pyramid**

I'm passionate about testing, and LIVE Solution became a showcase for comprehensive test coverage:
- **Unit tests** for every function
- **Integration tests** for API endpoints
- **End-to-end tests** using **RobotFramework** with Python
- **Performance tests** to ensure we could handle peak loads

We lived and breathed **TDD/BDD**. Write the test first, watch it fail, make it pass, refactor. This discipline saved us countless hours of debugging.

**Quality Gates Everywhere**

Every commit went through **SonarQube** analysis. Code coverage below 80%? The pipeline failed. Cyclomatic complexity too high? Refactor required. We used **OctoPerf** for load testing, simulating thousands of concurrent users.

**Monitoring and Observability**

In production, we relied on **CloudWatch** for AWS metrics and **DataDog** for application-level monitoring. We built dashboards that showed everything from Lambda execution times to error rates to user engagement metrics. When something went wrong, we knew about it before users did.

**The AWS Ecosystem**

We leveraged AWS deeply:
- **Lambda** for compute
- **DynamoDB** for lightning-fast data access
- **S3** for static assets and data storage
- **Step Functions** for orchestrating complex workflows
- **CloudWatch** for monitoring and alerting

**The Human Element**

Technology is only half the story. The other half is people. We worked closely with station staff, understanding their needs, iterating on designs based on feedback. We shadowed them during peak hours, watching how they used our system.

**The Impact**

Today, LIVE Solution powers passenger information across France's major train stations. Millions of travelers rely on it daily. The system handles peak loads effortlessly, and our monitoring shows 99.9%+ uptime.

**What I Learned**

Building at scale requires more than technical chops. It requires:
- Robust architecture that can handle failure
- Comprehensive testing at every level
- Monitoring that gives you confidence
- Collaboration across large, distributed teams
- Never compromising on quality, even under pressure

**The Proudest Moment**

Standing in Gare de Lyon during rush hour, watching thousands of passengers glance at screens powered by code I helped write, seeing them make confident decisions about their journeys—that's why we build systems.`,
    image: "/images/sncf-connect.png",
    tags: ["React", "NodeJS", "AWS", "Lambda", "DynamoDB", "TypeScript", "Serverless", "RobotFramework"],
    date: "2022-05-10T00:00:00.000Z"
  },
  {
    id: "4",
    slug: "sfr-iptv-streaming-platform",
    title: "Architecting RMC/BFM's IPTV Platform: Where Content Meets Code",
    description: "Building a streaming application that delivers live TV to thousands of concurrent viewers with Angular 13 and NX",
    content: `When **SFR** approached me to architect their **RMC/BFM IPTV streaming application**, I knew this would be a project where performance wasn't just important—it was everything. Streaming video to thousands of concurrent users doesn't tolerate mediocrity.

**The Vision**

RMC and BFM are major French news and radio networks. The goal: deliver their live content, TV guides, and on-demand programming through a modern, responsive web application. Users expected Netflix-quality UX, and we had to deliver.

**Why Angular 13?**

We chose **Angular 13** for several reasons:
- Strong TypeScript support
- Robust framework for complex applications
- Excellent tooling and ecosystem
- Built-in features for performance optimization

But we didn't just use Angular—we built it right.

**The NX Monorepo**

Early on, I pushed for **NX** as our monorepo solution. Why? Because we knew we'd have multiple applications (web, mobile web, admin panels) sharing code. NX gave us:
- Shared component libraries
- Consistent code standards across projects
- Powerful code generation
- Intelligent build caching

It was a game-changer for our productivity.

**The Live TV Module**

Building the live TV experience required careful attention to streaming protocols. We used **Shaka Player**, configuring it for optimal performance across different network conditions. Buffering, bitrate adaptation, error recovery—every detail mattered.

**The TV Guide Challenge**

A TV guide is deceptively complex. You're displaying schedules across channels and time, handling timezone conversions, dealing with last-minute program changes. We built a reactive system using **RxJS** that could update the guide in real-time as schedules changed.

**Analytics Integration**

French media companies take audience measurement seriously. We integrated:
- **Médiamétrie** for official audience measurement
- **AT Internet** for detailed web analytics
- **Didomi** for GDPR-compliant consent management

Each integration required careful implementation to ensure accurate tracking without impacting performance.

**SEO with Server-Side Rendering**

For content discoverability, we implemented **Angular Universal** for server-side rendering (SSR). Every page was pre-rendered on the server, making it crawlable by search engines while still providing a rich single-page application experience.

**Reactive Programming Everywhere**

**RxJS** became our secret weapon. Every data stream—from API calls to user interactions to real-time schedule updates—was modeled as observables. This gave us powerful composition, error handling, and the ability to cancel operations cleanly.

**The Backend**

While the frontend got the glory, the **NodeJS** backend did the heavy lifting:
- Proxying streaming protocols
- Caching TV guide data in **MongoDB**
- Serving APIs for content metadata
- Handling user authentication and preferences

**Performance Obsession**

We optimized ruthlessly:
- Lazy loading for routes
- Image optimization and lazy loading
- Service workers for offline capability
- Bundle size analysis and tree shaking
- Memory leak detection and elimination

**The SCSS Architecture**

We built a comprehensive design system in **SCSS**, with:
- CSS variables for theming
- BEM methodology for class naming
- Responsive mixins for breakpoints
- Animation utilities for smooth transitions

**Key Learnings**

Building a streaming platform taught me:
- Performance is a feature, not an afterthought
- Reactive programming shines in real-time applications
- Monorepos with NX scale better than multiple repos
- SSR is crucial for content-heavy applications
- Never underestimate the complexity of TV scheduling

**The Result**

We delivered a platform that handled thousands of concurrent streams smoothly. Users could watch live TV, browse guides, access on-demand content, all with a responsive, polished interface. The analytics integrations provided valuable insights, and SEO brought organic traffic.

**Personal Pride**

This project showcased what modern web development can achieve. From architecture to implementation to optimization, every decision was intentional. And it worked.`,
    image: "/images/sfr.webp",
    tags: ["Angular 13", "RxJS", "NX", "SSR", "NodeJS", "MongoDB", "IPTV", "Performance"],
    date: "2021-02-15T00:00:00.000Z"
  },
  {
    id: "5",
    slug: "orange-service-platform-architecture",
    title: "Designing Orange's Service Management Platform: Architecture First",
    description: "How thoughtful architecture and cloud-native design shaped Orange's customer service application",
    content: `When I started at **Orange** in January 2020, I wasn't just joining as a developer—I was brought in to **architect the entire frontend** for their service management platform. This was a greenfield project, and the decisions I made would affect the team for years to come.

**The Requirements**

Orange needed a comprehensive platform where customers could:
- View their consumption (data, calls, messages)
- Manage their bills and payment methods
- Get support and troubleshoot issues
- Manage their account and services

Millions of Orange customers would eventually use this platform. No pressure, right?

**Architecture Decisions**

I started with the fundamentals:

**1. Module Structure**
I designed a modular architecture where each major feature (billing, consumption, support) was its own lazy-loaded module. This kept bundles small and load times fast.

**2. State Management**
For state, we used a **Redux-style** pattern with **NgRx**. Every state change was traceable, making debugging easier and time-travel debugging possible during development.

**3. API Layer**
I created a comprehensive service layer that abstracted API communication. This made it easy to mock APIs during development and swap endpoints between environments.

**The Component Library**

From day one, I built a reusable component library:
- Buttons, inputs, cards—all the basics
- Complex components like consumption charts
- Specialized widgets for bill visualization
- Mobile-responsive by default

Every component had:
- Unit tests
- Storybook documentation
- Accessibility considerations
- TypeScript interfaces

**Angular 10 Features**

We leveraged **Angular 10's** strengths:
- Strict mode for better type safety
- Improved tree-shaking for smaller bundles
- Enhanced template diagnostics
- Better performance with differential loading

**The Backend Side**

I also contributed to the **NodeJS** backend:
- RESTful APIs using Express
- **MongoDB** for flexible data storage
- JWT authentication
- Rate limiting and security middleware

**Cloud-Native on GCP**

We deployed on **Google Cloud Platform**, using:
- **Kubernetes** for container orchestration
- **Docker** for containerization
- **Cloud Load Balancing** for traffic distribution
- **Cloud Storage** for static assets

**CI/CD with GitLab**

I set up comprehensive **GitLab CI** pipelines:
- Lint checks on every commit
- Unit tests that had to pass
- E2E tests in staging
- Automatic deployment to development
- Manual approval for production

**Docker Everything**

Every environment was Dockerized:
- Development containers with hot reload
- Testing containers with headless browsers
- Production containers optimized for size

This ensured consistency—if it worked on my machine, it worked everywhere.

**Documentation Culture**

I established documentation as a first-class concern. Every architectural decision was documented in **Confluence**:
- Architecture diagrams
- Component documentation
- API specifications
- Deployment procedures
- Troubleshooting guides

**Team Collaboration**

Working in Scrum with a Product Owner, 4 developers, and 2 testers, I learned the importance of:
- Clear communication about technical decisions
- Involving the team in architecture discussions
- Pair programming for knowledge transfer
- Code reviews that teach, not just critique

**The Challenges**

Not everything was smooth:
- Integrating with legacy Orange systems required creative adapters
- Performance optimization for users on slower connections
- Accessibility requirements were strict (as they should be)
- Security reviews caught issues we had to address

**The Wins**

But we overcame them:
- Lazy loading reduced initial load time by 60%
- Service workers enabled offline viewing of bills
- Responsive design worked beautifully on all devices
- Accessibility audit passed with flying colors

**What I'm Most Proud Of**

The architecture I designed scaled. As the team grew and features were added, the modular structure held up. New developers could onboard quickly because the patterns were consistent. Tests caught bugs before users did.

**Key Lessons**

- Invest time in architecture upfront—it pays dividends
- Documentation isn't optional for sustainable projects
- Cloud-native design makes scaling easier
- CI/CD isn't overhead—it's insurance
- Good architecture enables good development

**The Impact**

The platform launched successfully, serving millions of Orange customers. The architecture I designed became the foundation for future Orange web applications. Sometimes, the best code is the code that makes other developers' jobs easier.`,
    image: "/images/orange.png",
    tags: ["Angular 10", "NodeJS", "Docker", "Kubernetes", "GCP", "Architecture", "CI/CD"],
    date: "2020-01-15T00:00:00.000Z"
  },
  {
    id: "6",
    slug: "kpeiz-social-media-analytics",
    title: "Building KPEIZ: Social Media Analytics for the Data-Driven Marketer",
    description: "How we built a comprehensive analytics platform that transformed social media data into actionable insights",
    content: `Social media marketing in 2019 was evolving rapidly. Marketers needed more than vanity metrics—they needed **actionable insights**. That's what we set out to build at **KPEIZ**: a platform that turned social media data into strategic decisions.

**The Vision**

KPEIZ wasn't just another analytics dashboard. It was a comprehensive platform that:
- Tracked performance across Facebook and Instagram
- Compared your metrics against competitors (benchmarking)
- Identified trending content and optimal posting times
- Generated detailed reports for clients
- Managed multiple accounts and brands

**The Technical Stack**

We built on proven technologies:
- **Angular 8** for the frontend
- **NodeJS** with Express for the backend
- **MongoDB** for flexible data storage
- **Chart.js** for beautiful visualizations
- **Gridster** for customizable dashboards

**Integrating Social APIs**

The heart of KPEIZ was its integration with social platforms. Using the **Facebook Graph API** and **Instagram Graph API**, we pulled:
- Post metrics (likes, comments, shares, reach)
- Follower demographics
- Engagement rates over time
- Story performance
- Audience insights

The challenge? These APIs had rate limits and required careful error handling. We built a robust queuing system that respected limits while ensuring data freshness.

**The Module System**

I implemented several key modules:

**1. Packs Module**
Users could purchase different analytics packages. Each pack unlocked certain features. This required careful permission management and feature flagging.

**2. Business Tags**
Users could tag posts with custom business categories (product launch, event, promotion). This enabled analysis by campaign type—powerful for strategic planning.

**3. Invoicing System**
Integrated billing with payment processing. Users could upgrade, downgrade, and manage subscriptions seamlessly.

**4. Benchmarking**
This was the killer feature. Compare your performance against industry averages or specific competitors. We aggregated anonymized data to provide meaningful comparisons while respecting privacy.

**Data Visualization**

**Chart.js** powered our visualizations:
- Line charts for metrics over time
- Bar charts for post comparisons
- Pie charts for demographic breakdowns
- Radar charts for multi-metric comparisons

Every chart was interactive—hover for details, click to drill down, export as image.

**The Dashboard Builder**

Using **Gridster**, we let users build custom dashboards:
- Drag-and-drop widgets
- Resize charts and cards
- Save layouts for different views
- Share dashboards with team members

This customization made KPEIZ feel personal—each user's workspace was unique.

**Report Generation**

Marketers needed reports for clients. We built a report generator that:
- Pulled data for any date range
- Included key metrics and charts
- Generated PDF or web reports
- Branded with the user's logo
- Scheduled automatic delivery

**Payment Integration with Stripe**

For payments, we integrated **Stripe**:
- Secure card tokenization
- Subscription management
- Webhook handling for payment events
- Invoice generation
- Failed payment recovery

Stripe's API was a pleasure to work with—well-documented and reliable.

**Security Considerations**

Handling social media tokens and payment information required serious security:
- OAuth tokens encrypted at rest
- API keys in environment variables, never in code
- HTTPS everywhere
- Rate limiting on our APIs
- Regular security audits

**Performance Optimization**

With users potentially tracking hundreds of posts:
- Data aggregation in the background
- Caching of computed metrics
- Pagination for large datasets
- Lazy loading of chart libraries
- Database indexing for fast queries

**The UX/UI Challenge**

Analytics platforms can be overwhelming. We focused on:
- Clean, uncluttered interfaces
- Progressive disclosure (show basics, reveal details on demand)
- Consistent design language
- Responsive design for mobile access
- Helpful tooltips and onboarding

**API Development**

On the backend, I built secure REST APIs:
- Authentication with JWT tokens
- Role-based access control
- Input validation and sanitization
- Comprehensive error handling
- API documentation with Postman collections

**MongoDB Optimization**

As data grew, database performance mattered:
- Compound indexes for common queries
- Aggregation pipelines for complex analytics
- Data archiving for old metrics
- Regular backups and replication

**What Made KPEIZ Special**

It wasn't just features—it was the combination:
- Real social media data, not demos
- Actionable insights, not just numbers
- Flexible enough for agencies, simple enough for individuals
- Affordable pricing that scaled with usage

**Key Lessons**

- API integration requires defensive programming
- Data visualization is an art and a science
- Performance matters when dealing with large datasets
- Security can't be an afterthought
- User feedback drives the best features

**The Result**

KPEIZ attracted hundreds of users, from solo marketers to agencies managing dozens of clients. The platform processed millions of social media data points, generating insights that informed real marketing strategies.

**Personal Growth**

This project taught me full-stack development in the truest sense. From social APIs to payment processing, from data visualization to security, I touched every part of the stack. It made me a more complete developer.`,
    image: "/images/kpeiz.jpeg",
    tags: ["Angular 8", "NodeJS", "MongoDB", "REST APIs", "Stripe", "Analytics", "Chart.js"],
    date: "2019-01-20T00:00:00.000Z"
  }
];