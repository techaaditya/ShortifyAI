/**
 * ShortifyAI UI Components Index
 * 
 * Central export for all custom UI components.
 * Import components from '@/components/ui' for cleaner imports.
 */

// ============================================================================
// GLASS COMPONENTS
// ============================================================================
export {
    GlassCard,
    GlassPanel,
    NeonBorderCard,
    HolographicCard,
    FeatureCard,
    StatCard,
    type GlassVariant,
    type GlowColor,
} from './glass-card';

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================
export {
    AnimatedButton,
    IconButton,
    GradientButton,
    LoadingSpinner,
    type ButtonVariant,
    type ButtonSize,
} from './animated-button';

// ============================================================================
// FORM COMPONENTS (Radix UI based)
// ============================================================================
export { Button, buttonVariants } from './button';
export { Input } from './input';
export { Label } from './label';
export { Checkbox } from './checkbox';
export { RadioGroup, RadioGroupItem } from './radio-group';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
export { Slider } from './slider';
export { Switch } from './switch';
export { Textarea } from './textarea';

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
export { Separator } from './separator';
export { ScrollArea, ScrollBar } from './scroll-area';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

// ============================================================================
// OVERLAY COMPONENTS
// ============================================================================
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
export { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './context-menu';
export { Popover, PopoverContent, PopoverTrigger } from './popover';
export { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
export { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './drawer';

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './navigation-menu';
export { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './menubar';
export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb';

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================
export { Avatar, AvatarFallback, AvatarImage } from './avatar';
export { Badge, badgeVariants } from './badge';
export { Progress } from './progress';
export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';
export { AspectRatio } from './aspect-ratio';
export { Calendar } from './calendar';
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle } from './chart';

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================
export { Alert, AlertDescription, AlertTitle } from './alert';
export { Skeleton } from './skeleton';
export { Toaster } from './sonner';
export { Toggle, toggleVariants } from './toggle';
export { ToggleGroup, ToggleGroupItem } from './toggle-group';

// ============================================================================
// FORM UTILITIES
// ============================================================================
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from './form';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './command';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';
