import Link from 'next/link'

export default function LinkNew({ active, path, query, children }) {
  return (
    <>
      {active ? (
        <Link
          href={{
            pathname: path,
            query: query,
          }}
        >
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </>
  )
}
