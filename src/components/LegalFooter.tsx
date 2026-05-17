import Link from "next/link";

export default function LegalFooter() {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Link href="/impressum" className="text-gray-700 hover:text-gray-500 text-xs transition-colors duration-200">
        Impressum
      </Link>
      <span className="text-gray-800 text-xs">·</span>
      <Link href="/datenschutz" className="text-gray-700 hover:text-gray-500 text-xs transition-colors duration-200">
        Datenschutz
      </Link>
    </div>
  );
}
