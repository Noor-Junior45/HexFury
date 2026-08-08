import { useState, useEffect } from 'react';
import data from './mockData.json';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  tier: 'milestone' | 'streak' | 'special';
  progress?: { current: number; target: number };
};

export type StreakDay = {
  day: number;
  status: 'complete' | 'missed' | 'pending';
  date: string;
  project: string | null;
  github: string | null;
  linkedin: string | null;
  missReason?: string;
};

export type DayTask = {
  day: number;
  date: string;
  title: string;
  trackId: string;
  duration: string;
  difficulty: string;
  summary: string;
  why: string;
  requirements: string[];
  hints: string[];
  recruiterNote: string;
  submission: {
    githubLabel: string;
    githubPlaceholder: string;
    linkedinLabel: string;
    linkedinPlaceholder: string;
    streakSafeWhen: string;
  };
};

export const appData = data as {
  brand: { name: string; tagline: string; cycleDays: number; edition: string };
  stats: { activeBuilders: number; streaksKept: number; recruitersWatching: number; projectsShipped: number };
  tracks: Array<{ id: string; name: string; shortName: string; color: string; description: string; skills: string[] }>;
  student: {
    name: string;
    college: string;
    trackId: string;
    currentDay: number;
    joinedDate: string;
    avatarInitials: string;
    rank: string;
    rankTier: number;
    rankLabel: string;
    bio: string;
    streakFreeze: { total: number; used: number; available: boolean };
  };
  streakHistory: StreakDay[];
  currentStreak: { count: number; longestStreak: number; lastCompletedDay: number; todayDay: number; status: string };
  day12: DayTask;
  days: DayTask[];
  badges: Badge[];
  recruiters: Array<{ company: string; role: string; location: string; watching: boolean }>;
  testimonials: Array<{ name: string; college: string; quote: string; outcome: string }>;
};

const TRACK_STORAGE_KEY = 'abtalks_selected_track_id';

export function getActiveTrackId(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(TRACK_STORAGE_KEY);
    if (saved && appData.tracks.some((t) => t.id === saved)) {
      appData.student.trackId = saved;
      return saved;
    }
  }
  return appData.student.trackId || 'fullstack-ai';
}

export function setActiveTrackId(trackId: string): void {
  if (!appData.tracks.some((t) => t.id === trackId)) return;
  appData.student.trackId = trackId;
  if (typeof window !== 'undefined') {
    localStorage.setItem(TRACK_STORAGE_KEY, trackId);
    window.dispatchEvent(new Event('abtalks_track_changed'));
  }
}

export function useActiveTrack() {
  const [trackId, setTrackId] = useState<string>(() => getActiveTrackId());

  useEffect(() => {
    const handleTrackChange = () => {
      setTrackId(getActiveTrackId());
    };
    window.addEventListener('abtalks_track_changed', handleTrackChange);
    return () => window.removeEventListener('abtalks_track_changed', handleTrackChange);
  }, []);

  const changeTrack = (newTrackId: string) => {
    setActiveTrackId(newTrackId);
    setTrackId(newTrackId);
  };

  const track = getTrack(trackId) || appData.tracks[0];

  return { trackId, track, changeTrack };
}

export const getTrack = (id: string) => appData.tracks.find((t) => t.id === id);

// Track specific tasks catalog for Days 1 to 20
type TrackTaskMap = Record<string, Record<number, Partial<DayTask>>>;

const trackTaskCatalogs: TrackTaskMap = {
  'fullstack-ai': {
    1: {
      title: 'CLI AI Prompt Builder & Session Logger',
      summary: 'Build a Node.js CLI tool that formats system prompts, tests LLM inputs, and appends history logs to JSON files.',
      why: 'Mastering CLI prompts, file I/O, and structured template generation prepares you for building LLM developer tooling.',
      requirements: ['Prompt text input CLI interface', 'JSON logging to ~/.prompt-history.json', 'ANSI colorful output formatting', 'Export prompt template capability']
    },
    2: {
      title: 'Markdown Note Taker & AI Summary API',
      summary: 'Develop an Express service that parses uploaded Markdown notes, extracts YAML metadata, and generates AI key takeaways.',
      why: 'Handling file uploads, YAML parsing, and content summarization is fundamental for intelligent document apps.'
    },
    3: {
      title: 'AI Weather Summary App with REST API',
      summary: 'Fetch real-time weather forecasts and generate human-friendly outfit recommendations using weather metrics.',
      why: 'Combining REST API data fetching with dynamic UI formatting creates highly intuitive product features.'
    },
    4: {
      title: 'Expense Splitter Engine & Debt Minimization UI',
      summary: 'Design a full-stack expense balance calculator that reduces peer-to-peer debts into minimal settlement transactions.',
      why: 'Applying greedy graph simplification in full-stack interfaces demonstrates strong algorithmic capability.'
    },
    5: {
      title: 'High-Performance URL Shortener & Analytics',
      summary: 'Build a full-stack URL shortener featuring Base62 short codes, click counting, and redirect speed tracking.',
      why: 'URL shorteners test key-value storage, caching, and analytics visualization across frontend and backend.'
    },
    6: {
      title: 'Realtime WebSocket Chatroom with AI Bot',
      summary: 'Implement a multi-room messaging server using Socket.io with typing indicators and automated AI chat responses.',
      why: 'Event-driven WebSocket architecture is essential for modern AI chat platforms and live workspace tools.'
    },
    7: {
      title: 'JWT Authentication Flow with Role-Based Access',
      summary: 'Implement user login, signup, HTTP-only cookies, and role middleware protecting sensitive AI features.',
      why: 'Security and identity management are non-negotiable requirements for SaaS full-stack applications.'
    },
    8: {
      title: 'Secure Image Upload & AI Vision Tagging',
      summary: 'Construct an upload API that issues presigned cloud URLs and automatically extracts image tags.',
      why: 'Direct-to-cloud media uploads with automated metadata tagging power modern content platforms.'
    },
    9: {
      title: 'Full-Stack Kanban Task Board with Drag & Drop',
      summary: 'Create an interactive task management board with column updates, persistent state, and optimistic UI.',
      why: 'Drag-and-drop state synchronization and optimistic updates are core patterns in web applications.'
    },
    10: {
      title: 'AI Text Summarizer API with Rate Throttling',
      summary: 'Build a rate-limited REST API endpoint that accepts long articles and returns bulleted executive summaries.',
      why: 'Throttling expensive API endpoints protects infrastructure while providing high-value text processing.'
    },
    11: {
      title: 'Real-Time Markdown Collaborative Editor',
      summary: 'Build a multi-user text editor that syncs live cursor positions and text edits across connected browser sessions.',
      why: 'Multi-user real-time synchronization demonstrates mastery over web sockets and concurrent state handling.'
    },
    12: {
      title: 'Building a Semantic Search API with Python & TF-IDF Vectors',
      summary: 'Build a FastAPI service that ranks documents by semantic similarity using TF-IDF vectors and cosine distance.',
      why: 'Recruiters hiring for AI-adjacent backend roles want to see you reason about text-as-vectors. TF-IDF is the foundation every RAG and embedding system builds on.'
    },
    13: {
      title: 'RAG Knowledge Base Engine with PGVector',
      summary: 'Construct a Retrieval-Augmented Generation backend using PostgreSQL PGVector to embed, store, and query vector representations.',
      why: 'RAG pipelines are the industry standard for grounding LLMs on private enterprise documentation.'
    },
    14: {
      title: 'LLM Structured Output Generator with Zod',
      summary: 'Build a service that guarantees strictly-typed JSON responses from LLMs using Zod schema validation.',
      why: 'Reliable AI integration requires converting unstructured LLM text into predictable software objects.'
    },
    15: {
      title: 'Autonomous AI Agent with Tool Calling',
      summary: 'Implement a multi-turn ReAct agent loop in Node.js that executes custom tools to answer multi-step user queries.',
      why: 'Agentic workflows that select and execute external tools represent the cutting edge of AI engineering.'
    }
  },

  'backend-systems': {
    1: {
      title: 'CLI Pomodoro Timer with Session Logging',
      summary: 'Build a Node.js CLI tool that runs customizable Pomodoro focus cycles with sound alerts and appends stats to a JSON session log.',
      why: 'Mastering CLI input handling, timer intervals, process signals, and file I/O builds fundamental asynchronous coding instincts.'
    },
    2: {
      title: 'RESTful Note Service with Express & SQLite',
      summary: 'Develop an Express API that stores structured markdown notes in SQLite with search index and tags.',
      why: 'Relational data modeling, SQL queries, and REST route organization are foundational for backend engineers.'
    },
    3: {
      title: 'Weather CLI Tool with REST API & File Cache',
      summary: 'Fetch real-time weather forecasts by city name using Open-Meteo API, with a 10-minute local file cache.',
      why: 'Integrating 3rd-party REST APIs and client-side caching are essential patterns in distributed architecture.'
    },
    4: {
      title: 'Expense Splitter Engine & Debt Minimization',
      summary: 'Design a RESTful API that accepts group expenses and calculates the minimal set of balance transfers using greedy graph logic.',
      why: 'Solving debt simplification tests algorithmic logic and balance calculation skills prized in backend interviews.'
    },
    5: {
      title: 'High-Performance URL Shortener & Redis Cache',
      summary: 'Build a Bitly-style URL shortener service featuring Base62 hash generation, Redis redirection caching, and click analytics.',
      why: 'URL shorteners test key-value lookup, encoding, analytics incrementing, and cache invalidation.'
    },
    6: {
      title: 'High-Concurrency Chat Server with WebSockets',
      summary: 'Implement a multi-room socket server in Node.js supporting channel subscriptions, heartbeat pings, and disconnect recovery.',
      why: 'Bi-directional socket connections and stateful connection handling are essential for streaming systems.'
    },
    7: {
      title: 'JWT Auth Service with Refresh Token Rotation',
      summary: 'Implement secure user authentication using HTTP-only cookies, bcrypt hashing, short-lived access tokens, and refresh rotation.',
      why: 'Security and identity management are non-negotiable skills for production backend development.'
    },
    8: {
      title: 'Multi-Tenant Isolation & Middleware Routing',
      summary: 'Build an Express middleware that isolates request contexts per tenant, enforcing DB schema separation and rate limits.',
      why: 'Multi-tenancy architecture is a core requirement for enterprise SaaS backend engineering.'
    },
    9: {
      title: 'PostgreSQL Migration Engine & Drizzle ORM',
      summary: 'Design a clean relational database schema using Drizzle ORM, create migration scripts, and write complex SQL joins.',
      why: 'Database schema design, foreign keys, indexing, and migration pipelines are critical for backend architecture.'
    },
    10: {
      title: 'Background Task Queue with BullMQ & Redis',
      summary: 'Build a background job processing queue that offloads heavy tasks to async worker processes with exponential retries.',
      why: 'Decoupling slow synchronous API requests into background queues prevents timeouts and improves API throughput.'
    },
    11: {
      title: 'Sliding Window Rate Limiter Middleware',
      summary: 'Implement a custom rate limiting middleware using Redis sorted sets (ZADD/ZREMRANGEBYSCORE) for traffic throttling.',
      why: 'Protecting public APIs from abuse requires algorithmic rate limiting across distributed instances.'
    },
    12: {
      title: 'In-Memory Key-Value Store with LRU Eviction',
      summary: 'Build a concurrent thread-safe key-value cache engine in Node/Go featuring O(1) LRU cache eviction and TTL expiration.',
      why: 'Building cache engines from first principles demonstrates deep comprehension of memory layout and data structures.'
    },
    13: {
      title: 'Distributed Lock Manager using Redlock Algorithm',
      summary: 'Implement distributed locking across multiple Redis nodes to prevent race conditions during concurrent mutations.',
      why: 'Distributed locking is critical for maintaining data integrity in microservices and high-throughput systems.'
    },
    14: {
      title: 'Idempotent Payment Webhook Handler',
      summary: 'Construct a resilient webhook receiver that deduplicates incoming event IDs using database transactions and idempotency keys.',
      why: 'Ensuring exactly-once processing for webhooks is mandatory for payment systems like Stripe and PayPal.'
    },
    15: {
      title: 'Kafka Event Consumer with Dead-Letter Queue',
      summary: 'Build an event-driven Kafka consumer with message validation, failure circuit breakers, and dead-letter topic routing.',
      why: 'Event streaming pipelines power event-driven microservice architectures in high-scale backend engineering.'
    }
  },

  'devops-cloud': {
    1: {
      title: 'Dockerized Microservice & Security Audit',
      summary: 'Package a Node/Python service into multi-stage Docker containers with minimal Alpine footprint and vulnerability scanning.',
      why: 'Containerization, multi-stage builds, and non-root security are mandatory prerequisites for cloud engineering.'
    },
    2: {
      title: 'Nginx Reverse Proxy & Load Balancer',
      summary: 'Configure Nginx as a reverse proxy load balancer with round-robin health checks and automated SSL termination.',
      why: 'Understanding edge routing, TLS termination, and traffic distribution is fundamental for cloud infrastructure.'
    },
    3: {
      title: 'Shell CLI Script for System Resource Monitoring',
      summary: 'Write a Bash/Python system monitor script that tracks CPU, RAM, disk usage, and sends Webhook alerts on threshold breach.',
      why: 'Automated infrastructure monitoring and alerting scripts save systems during unexpected spikes.'
    },
    4: {
      title: 'Terraform IaC for Multi-Region VPC',
      summary: 'Declare VPC subnets, internet gateways, route tables, and security groups using modular Terraform HCL scripts.',
      why: 'Declarative Infrastructure-as-Code is the industry standard for provisioning reproducible cloud environments.'
    },
    5: {
      title: 'GitHub Actions CI/CD Automated Testing Pipeline',
      summary: 'Build an automated GitHub workflow that runs linting, unit tests, Docker builds, and pushes images to Docker Hub.',
      why: 'CI/CD automation guarantees code quality and reduces deployment risk across engineering teams.'
    },
    6: {
      title: 'Prometheus Metrics Exporter & Grafana Dashboards',
      summary: 'Instrument an API with Prometheus client metrics (counter, gauge, histogram) and visualize RPS/latency on Grafana.',
      why: 'Observability and telemetry instrumentation enable proactive debugging and SLA tracking.'
    },
    7: {
      title: 'HashiCorp Vault & Dynamic Database Credentials',
      summary: 'Connect application services to HashiCorp Vault to fetch short-lived dynamic DB credentials on-the-fly.',
      why: 'Eliminating hardcoded static secrets is a top priority in modern zero-trust cloud security.'
    },
    8: {
      title: 'Secure S3 Storage Gateway with Presigned URLs',
      summary: 'Construct an API issuing S3 presigned upload/download URLs with strict CORS and bucket encryption policies.',
      why: 'Direct-to-cloud storage offloads bandwidth and scales effortlessly without exposing credentials.'
    },
    9: {
      title: 'Kubernetes Deployment & Autoscaling HPA',
      summary: 'Deploy microservice manifests to Kubernetes with Horizontal Pod Autoscaler, readiness probes, and rolling updates.',
      why: 'Kubernetes orchestration controls container lifecycle, auto-scaling, and self-healing resilience.'
    },
    10: {
      title: 'Helm Chart Packaging for Microservices App',
      summary: 'Package complex multi-container application manifests into parameterized Helm charts for multi-environment deployments.',
      why: 'Helm is the package manager for Kubernetes, enabling clean staging/prod configuration management.'
    },
    11: {
      title: 'Infrastructure Vulnerability Scanner with Trivy',
      summary: 'Integrate Trivy container vulnerability scanner into GitHub Actions to block deployments with critical CVEs.',
      why: 'Shift-left security auditing catches vulnerabilities early in the delivery pipeline.'
    },
    12: {
      title: 'Automated Database Backup & PITR Recovery Script',
      summary: 'Create a crontab utility that executes PostgreSQL pg_dump, encrypts archives, and syncs backups to offsite S3 storage.',
      why: 'Automated disaster recovery strategies protect business continuity against catastrophic data loss.'
    },
    13: {
      title: 'Service Mesh Traffic Management with Istio & mTLS',
      summary: 'Configure Istio service mesh in Kubernetes for automated mutual TLS encryption and canary traffic splitting.',
      why: 'Service mesh technology simplifies traffic splitting, circuit breaking, and zero-trust mesh networking.'
    },
    14: {
      title: 'Cloudflare Edge Workers Logic & Geo-Routing',
      summary: 'Write serverless edge scripts on Cloudflare Workers to inspect incoming user headers and route traffic globally.',
      why: 'Edge computing reduces latency by running application logic close to end users worldwide.'
    },
    15: {
      title: 'AWS Lambda Serverless Event Pipeline with SQS',
      summary: 'Build a serverless pipeline triggered by AWS SQS queue messages with dead-letter queue routing and CloudWatch logs.',
      why: 'Serverless event-driven architecture scales down to zero cost while handling massive throughput spikes.'
    }
  },

  'data-ml': {
    1: {
      title: 'Automated Web Scraper & Data Cleaning Pipeline',
      summary: 'Build a Python scraper using BeautifulSoup/Playwright that extracts job postings and cleans messy text into structured JSON.',
      why: 'Extracting and cleaning unstructured web data is the first step in building proprietary datasets.'
    },
    2: {
      title: 'Pandas & Polars Data Processing Engine',
      summary: 'Analyze multi-gigabyte CSV datasets using Polars vectorization to compute missing values, aggregations, and statistics.',
      why: 'High-speed dataframe processing with modern libraries like Polars dramatically accelerates data pipelines.'
    },
    3: {
      title: 'Real-Time Stream Processor with Kafka & Python',
      summary: 'Construct a Python producer/consumer application that consumes IoT telemetry metrics and flags anomalies live.',
      why: 'Streaming data pipelines process events in real time rather than waiting for batch updates.'
    },
    4: {
      title: 'Feature Store Engine for Machine Learning',
      summary: 'Design a feature storage system that computes and serves point-in-time correct training features to ML models.',
      why: 'Feature stores prevent data leakage between training and inference in enterprise ML systems.'
    },
    5: {
      title: 'Exploratory Data Analysis & Visual Dashboard',
      summary: 'Build an interactive data dashboard visualizing trend distributions, correlations, and outliers.',
      why: 'Communicating complex data patterns through visual analytics is a core data science capability.'
    },
    6: {
      title: 'Customer Churn Prediction Model with Scikit-Learn',
      summary: 'Train a XGBoost/RandomForest model predicting customer subscription churn, optimizing precision-recall tradeoff.',
      why: 'Classification models driving business metrics like retention are standard industry projects.'
    },
    7: {
      title: 'FastAPI Model Inference Endpoint with Batching',
      summary: 'Wrap a scikit-learn model inside a FastAPI REST service supporting request batching and model latency logging.',
      why: 'Serving machine learning models via low-latency REST APIs bridges model development and software engineering.'
    },
    8: {
      title: 'Time-Series Forecasting Engine with Prophet',
      summary: 'Build a sales forecasting model analyzing seasonal trends, holiday effects, and confidence intervals.',
      why: 'Time-series forecasting drives inventory planning, demand estimation, and financial projections.'
    },
    9: {
      title: 'PyTorch Image Classifier with Transfer Learning',
      summary: 'Train a PyTorch convolutional neural network using ResNet transfer learning to classify defect images.',
      why: 'Transfer learning allows training high-accuracy vision models with smaller custom datasets.'
    },
    10: {
      title: 'Automated ETL Pipeline with Apache Airflow',
      summary: 'Author an Airflow DAG with dependency tasks, automated retry scheduling, and Slack error notifications.',
      why: 'Airflow is the de facto standard orchestration tool for scheduling complex data warehouse pipelines.'
    },
    11: {
      title: 'Data Warehouse Data Modeling with dbt & Postgres',
      summary: 'Build dbt dimensional models (star schema staging, facts, dimensions) with automated data freshness tests.',
      why: 'dbt transforms raw database tables into structured, tested analytics datasets.'
    },
    12: {
      title: 'Text Sentiment Analysis & NER Pipeline',
      summary: 'Build an NLP pipeline using SpaCy and Hugging Face Transformers to classify customer review sentiment and extract entities.',
      why: 'NLP pipelines parse customer feedback at scale for automated insights and classification.'
    },
    13: {
      title: 'Recommender System with Collaborative Filtering',
      summary: 'Construct a movie/product recommendation system using matrix factorization (SVD) and cosine similarity.',
      why: 'Personalized recommendation algorithms directly increase engagement and revenue in consumer apps.'
    },
    14: {
      title: 'Model Monitoring & Data Drift Detector with Evidently',
      summary: 'Implement automated data drift detection comparing production feature distributions against training baselines.',
      why: 'MLOps model monitoring ensures model predictions remain reliable as real-world data evolves over time.'
    },
    15: {
      title: 'Vector Embeddings Pipeline with Sentence Transformers',
      summary: 'Generate semantic vector embeddings for enterprise documentation and index them in a vector database for similarity search.',
      why: 'Vector embeddings form the core foundation for semantic search, clustering, and AI retrieval.'
    }
  }
};

export const getDay = (n: number, trackIdParam?: string): DayTask | undefined => {
  if (n < 1 || n > appData.brand.cycleDays) return undefined;

  const currentTrackId = trackIdParam || getActiveTrackId();
  const trackCatalog = trackTaskCatalogs[currentTrackId] || trackTaskCatalogs['fullstack-ai'];
  const catalogItem = trackCatalog[n];

  if (catalogItem) {
    return {
      day: n,
      date: catalogItem.date ?? `2025-11-${(12 + (n - 1)).toString().padStart(2, '0')}`,
      title: catalogItem.title ?? `Day ${n} Engineering Challenge`,
      trackId: currentTrackId,
      duration: catalogItem.duration ?? '~2.0 hrs',
      difficulty: catalogItem.difficulty ?? (n % 3 === 0 ? 'Advanced' : 'Intermediate'),
      summary: catalogItem.summary ?? `Implement a production-ready module for Day ${n} covering advanced software architecture and clean code principles.`,
      why: catalogItem.why ?? `Completing Day ${n} builds real hands-on experience with core engineering frameworks requested by tech hiring teams.`,
      requirements: catalogItem.requirements ?? [
        `Implement functional core feature for Day ${n}.`,
        'Ensure clean modular code structure with error handling.',
        'Write concise README documentation with local run instructions.',
        'Verify build and submit GitHub and LinkedIn proof links.'
      ],
      hints: catalogItem.hints ?? [
        'Keep functions small and focused on single responsibilities.',
        'Test edge cases like missing inputs and network timeouts.',
        'Review track guidelines and document your learning key points.'
      ],
      recruiterNote: catalogItem.recruiterNote ?? `Demonstrates consistent building habits and practical software engineering capability for Day ${n}.`,
      submission: {
        githubLabel: 'GitHub repository or commit link',
        githubPlaceholder: `https://github.com/noor-h/abtalks-day${n.toString().padStart(2, '0')}`,
        linkedinLabel: 'LinkedIn post link',
        linkedinPlaceholder: `https://linkedin.com/feed/update/noor-day${n.toString().padStart(2, '0')}`,
        streakSafeWhen: 'Both links submitted and validated'
      }
    };
  }

  // Fallback procedural task generator for days 16..60 for the specific track
  const activeTrackObj = getTrack(currentTrackId) || appData.tracks[0];
  return {
    day: n,
    date: `2025-11-${Math.min(30, 12 + n - 1)}`,
    title: `${activeTrackObj.name}: Day ${n} Production Challenge`,
    trackId: currentTrackId,
    duration: '~2.5 hrs',
    difficulty: n % 3 === 0 ? 'Advanced' : 'Intermediate',
    summary: `Build a production-grade ${activeTrackObj.name} module for Day ${n} focusing on resilience, clean modular architecture, and performance.`,
    why: `Mastering Day ${n} in ${activeTrackObj.name} prepares you directly for technical interviews and real-world software architecture challenges.`,
    requirements: [
      `Build the core Day ${n} pipeline in ${activeTrackObj.name}.`,
      'Include robust error boundaries and logging middleware.',
      'Write comprehensive unit tests covering main workflows.',
      'Publish your repository code and write a recruiter-focused LinkedIn post.'
    ],
    hints: [
      'Focus on modular code separation and clear type definitions.',
      'Benchmark performance under simulated load or concurrency.',
      'Document key architectural decisions in your project README.'
    ],
    recruiterNote: `Exhibiting hands-on experience in ${activeTrackObj.name} demonstrates top-tier engineering capability.`,
    submission: {
      githubLabel: 'GitHub repository or commit link',
      githubPlaceholder: `https://github.com/noor-h/abtalks-day${n.toString().padStart(2, '0')}`,
      linkedinLabel: 'LinkedIn post link',
      linkedinPlaceholder: `https://linkedin.com/feed/update/noor-day${n.toString().padStart(2, '0')}`,
      streakSafeWhen: 'Both links submitted and validated'
    }
  };
};

export const getStreakDay = (n: number) => appData.streakHistory.find((d) => d.day === n);
export const earnedBadges = () => appData.badges.filter((b) => b.earned);
export const lockedBadges = () => appData.badges.filter((b) => !b.earned);

export const completedDays = (trackIdParam?: string) => {
  const currentTrackId = trackIdParam || getActiveTrackId();
  return appData.streakHistory
    .filter((d) => d.status === 'complete')
    .map((d) => {
      const dayTask = getDay(d.day, currentTrackId);
      return {
        ...d,
        project: dayTask?.title ?? d.project ?? `Day ${d.day} Project`,
      };
    });
};

export const missedDays = () => appData.streakHistory.filter((d) => d.status === 'missed');

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function formatFullDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}


