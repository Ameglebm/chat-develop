export function generateRoomId(
  userA: string,
  userB: string,
): string {
  return [userA, userB]
    .sort()
    .join(':');
}

