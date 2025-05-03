import { Id } from "../_generated/dataModel";

// Types for your entities
type User = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string;
  image?: string;
  email?: string;
  emailVerificationTime?: number;
  phone?: string;
  phoneVerificationTime?: number;
  isAnonymous?: boolean;
  roles?: ("user" | "admin" | "recruiter" | "applicant")[];
};

type Recruiter = {
  userId?: Id<"users">;
  phone: number;
  country: string;
  city: string;
  description: string;
  rating?: number;
  updatedAt?: number;
};

type Applicant = {
  userId?: Id<"users">;
  education: {
    institutionName: string;
    startYear: string;
    endYear: string;
  }[];
  skills: {
    text: string;
    id: string;
  }[];
  fileId: Id<"_storage">;
  rating?: number;
  updatedAt?: number;
};

type Job = {
  userId: Id<"users">;
  category: string;
  title: string;
  maxApplicants: number;
  maxPositions: number;
  activeApplications?: number;
  acceptedApplicants?: number;
  skillsets: {
    text: string;
    id: string;
  }[];
  description: string;
  location: string;
  type: string;
  salary: number;
  companyLogo?: string;
  rating?: number;
  updatedAt?: number;
};

type Application = {
  applicantId: Id<"users">;
  recruiterId: Id<"users">;
  jobId: Id<"jobs">;
  status:
    | "applied"
    | "shortlisted"
    | "accepted"
    | "rejected"
    | "deleted"
    | "cancelled"
    | "finished";
  sop: string;
  updatedAt?: number;
};

type Rating = {
  category: string;
  applicantId: Id<"users">;
  recruiterId: Id<"users">;
  jobId: Id<"jobs">;
  ratings?: number;
  updatedAt?: number;
};

type Comment = {
  userId: Id<"users">;
  jobId: Id<"jobs">;
  text: string;
  updatedAt?: number;
};

type Category = {
  name: string;
  updatedAt?: number;
};

// Define roles
type Role = "admin" | "recruiter" | "applicant" | "user";

// Define permissions for different entities
type Permissions = {
  users: {
    dataType: User;
    action: "view" | "create" | "update" | "delete";
  };
  admin: {
    dataType: User;
    action: "view" | "create" | "update" | "delete";
  };
  recruiters: {
    dataType: Recruiter;
    action: "view" | "create" | "update" | "delete";
  };
  applicants: {
    dataType: Applicant;
    action: "view" | "create" | "update" | "delete";
  };
  comments: {
    dataType: Comment;
    action: "view" | "create" | "update" | "delete";
  };
  jobs: {
    dataType: Job;
    action: "view" | "create" | "update" | "delete";
  };
  applications: {
    dataType: Application;
    action: "view" | "create" | "update" | "delete";
  };
  ratings: {
    dataType: Rating;
    action: "view" | "create" | "update" | "delete";
  };
  categories: {
    dataType: Category;
    action: "view" | "create" | "update" | "delete";
  };
};

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

// Define role permissions
const ROLES = {
  user: {
    applicants: {
      view: false,
      create: true,
      delete: false,
      update: false,
    },
    recruiters: {
      view: false,
      create: true,
      delete: false,
      update: false,
    },
    jobs: {
      view: true,
      create: false,
      delete: false,
      update: false,
    },
    categories: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },
    ratings: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },
  },
  admin: {
    recruiters: {
      view: true,
      create: false,
      delete: true,
      update: true,
    },
    applicants: {
      view: true,
      create: false,
      delete: true,
      update: true,
    },
    comments: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    jobs: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    applications: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    categories: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    ratings: {
      view: true,
      create: false,
      delete: false,
      update: false,
    },
  },
  recruiter: {
    recruiters: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    applicants: {
      view: true,
      create: false,
      delete: false,
      update: true,
    },
    comments: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    jobs: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    applications: {
      view: true,
      create: false,
      update: true,
      delete: true,
    },
    categories: {
      view: true,
      create: true,
      delete: false,
      update: false,
    },
    ratings: {
      view: true,
      create: true,
      delete: false,
      update: false,
    },
  },
  applicant: {
    applicants: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    comments: {
      view: true,
      create: true,
      delete: true,
      update: true,
    },
    jobs: {
      view: true,
      create: false,
      delete: false,
      update: false,
    },
    applications: {
      view: true,
      create: true,
      update: true,
      delete: false,
    },
    categories: {
      view: true,
      create: false,
      delete: false,
      update: false,
    },
    ratings: {
      view: true,
      create: true,
      delete: false,
      update: false,
    },
  },
} as const satisfies RolesWithPermissions;

// Permission check function
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  return user?.roles?.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
      action
    ];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}
