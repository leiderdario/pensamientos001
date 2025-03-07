
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
}

export interface Idea {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  comments: number;
  tags: string[];
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
  parentId?: string;
}

// Mock data
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Product designer with a passion for creating elegant solutions to complex problems.",
    joinedAt: "2023-01-15T09:32:45Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Software engineer focused on building scalable web applications.",
    joinedAt: "2023-02-22T14:18:30Z",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Marketing specialist with expertise in digital strategy and brand management.",
    joinedAt: "2023-03-10T11:45:15Z",
  },
];

export const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "Decentralized Identity Management for Personal Data",
    content: "What if we created a system where individuals could truly own and control their personal data? A decentralized identity management platform could allow users to selectively share verified information without giving up ownership or control. This could revolutionize everything from healthcare to financial services.",
    author: MOCK_USERS[0],
    createdAt: "2023-08-15T10:24:35Z",
    likes: 42,
    comments: 8,
    tags: ["technology", "privacy", "blockchain"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Sustainable Urban Farming Networks",
    content: "Cities could become more self-sufficient by connecting rooftop gardens, vertical farms, and community spaces into coordinated networks. By sharing resources and knowledge, urban areas could produce significant portions of their food locally, reducing transportation costs and environmental impact.",
    author: MOCK_USERS[1],
    createdAt: "2023-08-10T15:37:22Z",
    likes: 28,
    comments: 5,
    tags: ["sustainability", "urban", "agriculture"],
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "AI-Powered Learning Paths for Personalized Education",
    content: "Traditional education treats all students the same, but we know everyone learns differently. What if an AI could analyze your learning style, strengths, and weaknesses to create completely personalized learning paths? This could make education more effective and engaging for everyone.",
    author: MOCK_USERS[2],
    createdAt: "2023-08-05T09:12:47Z",
    likes: 35,
    comments: 12,
    tags: ["education", "AI", "personalization"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Community-Driven Healthcare Support Networks",
    content: "What if we built platforms that connect people with similar health conditions locally? These networks could provide emotional support, share practical advice, and even coordinate resource sharing. It would be especially valuable for chronic conditions and rare diseases where specialized knowledge is crucial.",
    author: MOCK_USERS[0],
    createdAt: "2023-07-28T14:56:11Z",
    likes: 19,
    comments: 7,
    tags: ["health", "community", "support"],
  },
  {
    id: "5",
    title: "Reimagining Public Transportation with Autonomous Fleets",
    content: "Instead of fixed routes and schedules, cities could deploy fleets of smaller autonomous vehicles that dynamically respond to demand. This would be more efficient than traditional mass transit while still reducing overall vehicle numbers compared to individual car ownership.",
    author: MOCK_USERS[1],
    createdAt: "2023-07-20T11:33:29Z",
    likes: 31,
    comments: 9,
    tags: ["transportation", "urban", "autonomy"],
    image: "https://images.unsplash.com/photo-1556221620-e2e9a57aa248?q=80&w=2000&auto=format&fit=crop",
  },
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      content: "This is a fascinating concept! I wonder about the technical challenges in implementation though.",
      author: MOCK_USERS[1],
      createdAt: "2023-08-15T14:27:35Z",
      likes: 5,
      replies: [
        {
          id: "r1",
          content: "The zero-knowledge proof systems being developed could actually make this feasible now.",
          author: MOCK_USERS[2],
          createdAt: "2023-08-15T15:13:42Z",
          likes: 3,
          parentId: "c1",
        },
        {
          id: "r2",
          content: "Great point! I think the biggest hurdle might be regulatory frameworks, not just technical constraints.",
          author: MOCK_USERS[0],
          createdAt: "2023-08-15T16:05:19Z",
          likes: 2,
          parentId: "c1",
        },
      ],
    },
    {
      id: "c2",
      content: "I've been thinking about similar ideas. Would love to collaborate on this!",
      author: MOCK_USERS[2],
      createdAt: "2023-08-16T09:45:11Z",
      likes: 2,
    },
  ],
  "2": [
    {
      id: "c3",
      content: "I've seen some communities implementing smaller versions of this concept with great success.",
      author: MOCK_USERS[0],
      createdAt: "2023-08-11T12:34:27Z",
      likes: 7,
    },
    {
      id: "c4",
      content: "Would this work in colder climates? Seasonal variations seem like a challenge.",
      author: MOCK_USERS[2],
      createdAt: "2023-08-12T16:23:05Z",
      likes: 1,
      replies: [
        {
          id: "r3",
          content: "Great question! Indoor growing using LED technology could make this viable year-round even in cold climates.",
          author: MOCK_USERS[1],
          createdAt: "2023-08-12T17:45:22Z",
          likes: 4,
          parentId: "c4",
        },
      ],
    },
  ],
};

export const TRENDING_TAGS = [
  { name: 'technology', count: 42 },
  { name: 'AI', count: 38 },
  { name: 'sustainability', count: 31 },
  { name: 'health', count: 27 },
  { name: 'education', count: 24 },
  { name: 'business', count: 22 },
  { name: 'design', count: 19 },
  { name: 'society', count: 18 },
  { name: 'philosophy', count: 16 },
  { name: 'science', count: 15 },
];
