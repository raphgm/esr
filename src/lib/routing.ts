import { UserProfile, ConsultancyTask } from "../types";

export function calculateSkillScore(tasks: ConsultancyTask[], userId: string): number {
  const userTasks = tasks.filter(t => t.assignee === userId && t.status === 'done');
  // Example: 10 points per task
  return userTasks.length * 10;
}

export function findBestMatches(task: ConsultancyTask, allUsers: UserProfile[]): UserProfile[] {
  // Logic to find users with required skill and high score
  return allUsers
    .filter(u => u.skills.includes(task.skillRequired || ""))
    .sort((a, b) => b.skillScore - a.skillScore);
}

export function findBestTasks(user: UserProfile, allTasks: ConsultancyTask[]): ConsultancyTask[] {
  return allTasks
    .filter(task => task.status === 'todo' && user.skills.includes(task.skillRequired || ""))
    .sort((a, b) => (b.priority === 'High' ? 1 : 0) - (a.priority === 'High' ? 1 : 0));
}
