import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { SubscribeUiProvider } from "@/context/SubscribeUiContext";
import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { SkipToContent } from "@/components/SkipToContent";
import { SubscribeGate } from "@/components/SubscribeGate";
import { FaqChatGate } from "@/components/FaqChatGate";

type SiteShellProps = {
  children: React.ReactNode;
  paypalClientId: string | undefined;
};

export function SiteShell({ children, paypalClientId }: SiteShellProps) {
  return (
    <LocaleProvider>
      <SkipToContent />
      <CartProvider paypalClientId={paypalClientId}>
        <SubscribeUiProvider>
          {children}
          <ShoppingCartDrawer />
          <SubscribeGate />
          <FaqChatGate />
        </SubscribeUiProvider>
      </CartProvider>
    </LocaleProvider>
  );
}
