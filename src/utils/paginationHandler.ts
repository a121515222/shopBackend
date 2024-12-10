export function handlePagination(
  page: number,
  limit: number,
  totalCount: number
) {
  const hasPrevPage = page > 1;
  const hasNextPage = page * limit < totalCount;
  const totalPages = Math.ceil(totalCount / limit);
  return {
    currentPage: page,
    totalCount,
    totalPages,
    limit,
    hasPrevPage,
    hasNextPage
  };
}
