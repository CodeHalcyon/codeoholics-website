import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarMenuProps {
  navItems: { name: string; href: string; id: string }[]
  activeNavItem: string
  setActiveNavItem: (id: string) => void
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ navItems, activeNavItem, setActiveNavItem }) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <div className="relative">
        <ul className="flex gap-6">
          {navItems.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                data-nav={item.id}
                className={cn(
                  'text-foreground/80 hover:text-primary transition-colors relative py-2 px-1',
                  activeNavItem === item.id && 'text-primary'
                )}
                onClick={() => setActiveNavItem(item.id)}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/0"
                  whileHover={{
                    backgroundColor: 'rgba(var(--primary), 0.7)',
                    transition: { duration: 0.2 },
                  }}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </nav>
  )
}
