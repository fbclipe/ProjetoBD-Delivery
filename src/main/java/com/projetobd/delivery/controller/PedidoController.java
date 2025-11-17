package com.projetobd.delivery.controller;

import com.projetobd.delivery.entity.Pedido;
import com.projetobd.delivery.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService service;

    @PostMapping
    public long criar(@RequestBody Pedido p) {
        return service.criar(p);
    }

    @GetMapping("/{id}")
    public Pedido buscar(@PathVariable long id) {
        return service.buscar(id);
    }

    @PutMapping("/{id}")
    public int atualizar(@PathVariable long id, @RequestBody Pedido p) {
        p.setIdPedido(id);
        return service.atualizar(p);
    }

    @DeleteMapping("/{id}")
    public int deletar(@PathVariable long id) {
        return service.deletar(id);
    }

    @GetMapping
    public List<Pedido> listar() {
        return service.listar();
    }
    // ==========================
// TRIGGER 1 - LOG PAGAMENTO
// ==========================
    @PostMapping("/simular-pagamento")
    public void simularPagamento() {
        service.simularPagamentoTrigger();
    }

    @GetMapping("/log-pagamentos")
    public List<Map<String, Object>> listarLogs() {
        return service.listarLogsPagamento();
    }

    // ==========================
// TRIGGER 2 - TOTAL PEDIDO
// ==========================
    @PostMapping("/simular-item")
    public ResponseEntity<String> simularItemTrigger() {
        try {
            service.simularItemTrigger();
            // Retorna um HTTP 200 OK se tudo der certo
            return ResponseEntity.ok("Simulação do trigger executada com sucesso.");

        } catch (Exception e) {
            // Retorna um HTTP 400 Bad Request se algo der errado
            return ResponseEntity.badRequest().body("Erro na simulação: " + e.getMessage());
        }
    }

    @GetMapping("/pedidos-atualizados")
    public List<Map<String,Object>> listarPedidosAtualizados() {
        return service.listarPedidosAtualizados();
    }


    @PutMapping("/entrega/status")
    public String atualizarStatusEntrega(
            @RequestParam long idEntrega,
            @RequestParam String status
    ) {
        service.atualizarStatusEntrega(idEntrega, status);
        return "Status atualizado com sucesso!";
    }

    @PostMapping("/descontos")
    public String aplicarDescontos() {
        service.aplicarDescontosProgressivos();
        return "Descontos aplicados com sucesso!";
    }


}
