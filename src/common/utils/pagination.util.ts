export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export function paginate(
  params: PaginationParams,
): PaginationResult {
  const page = Math.max(
    Number(params.page) || 1,
    1,
  );

  const limit = Math.min(
    Math.max(Number(params.limit) || 10, 1),
    100,
  );

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
}

